import { h, JSX } from 'preact'
import { useRouter } from "preact-router";
import { useEffect, useState  } from 'preact/hooks';
import SearchComponent from '../components/search.component';
import { doRequest } from '../services/http.service';
import { BookingRequest, BookingResponse, Hotel, Holiday } from '../types/booking';
import { FilterProps } from '../types/hotel';
import { DateTime } from 'luxon';
import * as styles from './results.module.less'
import Loader from '../components/loader.component';
import CheckboxGroup from '../components/checkboxgroup.component'
import RadioGroup from '../components/radiogroup.component'
import HotelDetails from '../components/hotel.component';
import { AMENITIES, PRICES, RATINGS } from "../consts/hotel"




export default function ResultsRoute(): JSX.Element {
    const [searchParams] = useRouter();
    const [loading,setLoading] = useState(true)
    const [holidays, setHolidays] = useState<unknown | BookingResponse>([]);
    const [hotels, setHotels] = useState<unknown | BookingResponse>([]);
    const [masterFilter,setMasterFilter] = useState<FilterProps>({"price":[], "amenities":[], "ratings":[]})
    const [checkedBoxes, setCheckedBoxes] = useState([])


    const changeHandler = (event, filterName) => {
        collectFilters(event, filterName)
        manageFilters(event)
    }

    const manageFilters = (e) => {
        const checkedList = [...checkedBoxes]
        if(e){
            const { checked, id } = e.target
            if(checked) {
                checkedList.push(id)
            } else {
                const index = checkedBoxes.findIndex((ch) => ch === id);
                checkedList.splice(index, 1);
            }
        }else{
            checkedList.length = 0
            setMasterFilter({"price":[], "amenities":[], "ratings":[]})
        }
        setCheckedBoxes(checkedList)
    }

    const clickHandler = (event => {
        manageFilters(undefined)
    })

    const collectFilters = (event, filterName) => {
        let filters = []
        const { name, checked, id } = event.target        
        if(Object.keys(masterFilter).includes(filterName)){
            if(filterName == 'ratings'){
                filters = [id.substr(7)] 
            }else{          
                filters = (checked)? [name, ...masterFilter[filterName]] : masterFilter[filterName]?.filter( val => val != name )  
            }
            setMasterFilter({
                ...masterFilter,
                [filterName]: filters                
            })            
        }
        return filters
    }

    useEffect(() => {
        let result = []
        setLoading(true)
        const hotelDetails: Holiday[] = holidays as Holiday[]
        if(hotelDetails){
            Object.keys(masterFilter)?.map( name => {
                masterFilter[name].map( val => {
                    let tmpData = []
                    if(name === 'price'){
                        let pattern = /[a-zA-Z]+/g;
                        let filters = val.replace(pattern, " ");
                        filters = filters.trim().split(" ")                        
                        if( filters.length == 1 ){
                            tmpData = hotelDetails.filter( item => { return ( filters[0] == '2000' )?item.pricePerPerson <= 2000 : item.pricePerPerson > 11000 } )                        
                       }else if( filters.length == 2 ){
                            tmpData = hotelDetails.filter( item => { return ( item.pricePerPerson > filters[0] && item.pricePerPerson <= filters[1]) } )
                        }
                    }else if( name === "ratings"){
                        tmpData = hotelDetails.filter( hotel =>{ return hotel.hotel.content.starRating == val } )
                    }else if(name === 'amenities' ){
                        hotelDetails.filter( feature => {
                            feature.hotel.content.keyFeatures.map( amenity =>{ 
                                if( amenity.name == val ){
                                    tmpData.push(feature)
                                }
                            })
                        })
                    }
                    result = [...result, ...tmpData]                
                })
            })
            const filters = Object.values(masterFilter)?.filter( entry => entry.length > 0 )
            result = filters.length == 0 ? hotelDetails : result       
            result = removeDuplicates(result)
        }
        
        setHotels(result)
        setLoading(false)

    },[masterFilter])

    const removeDuplicates = (data) => {
        let hotelNames = []
        let hotelDetails = []
        Object.keys(data)?.map( item  => {
            if( !hotelNames.includes(data[item].hotel.name) ){
                hotelDetails.push(data[item])
            }
            hotelNames.push(data[item].hotel.name)
        })
        return hotelDetails
    }

    useEffect(() => {     
        setLoading(true)   
        const departureDate = DateTime.fromFormat(searchParams?.matches?.departureDate, "yyyy-MM-dd").toFormat("dd-MM-yyyy");
        const requestBody: BookingRequest = {
            "bookingType": "holiday",
            "location": searchParams?.matches?.location,
            "departureDate": departureDate,
            "duration": searchParams?.matches?.duration as unknown as number,
            "gateway": "LHR",
            "partyCompositions": [
                {
                    "adults": searchParams?.matches?.adults as unknown as number,
                    "childAges": [],
                    "infants": 0
                }
            ]
        }

        doRequest('POST', '/cjs-search-api/search', requestBody)
            .then((response: unknown | BookingResponse) => {
                const result: BookingResponse = response as BookingResponse;
                setHolidays(result.holidays)
                setHotels(result.holidays)
                setLoading(false)
            })
    }, [searchParams])


    return (
        <section>            
            <SearchComponent />            
            {             
                loading? <Loader loading={ loading } />:
                <div class={styles["row"]}>
                    <div class={ `${styles["column-left"]} left`} >                        
                    <header class={`${styles["flexContainer"]}`}>
                        <div class={`${styles["labelContainer"]}`}><h3>Filter by</h3></div>
                        <div class={`${styles["resetContainer"]}`}><input type="reset" value="Reset" class={`${styles["resetbtn"]}`} onClick={clickHandler}></input> </div>
                    </header>
                        <CheckboxGroup checkedBoxes = {checkedBoxes} groupName='Price per head' fields={PRICES} changeHandler={changeHandler} filterName="price" />
                        <RadioGroup checkedBoxes = {checkedBoxes} groupName='Guest Rating' fields={RATINGS} changeHandler={changeHandler} filterName="ratings" />                        
                        <CheckboxGroup checkedBoxes = {checkedBoxes}  groupName='Amenities' fields={AMENITIES} changeHandler={changeHandler} filterName="amenities" />                        
                    </div>
                    <HotelDetails holidays = {hotels}/>                    
                </div>
            }
        </section>
    )
}
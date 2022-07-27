import { h } from 'preact';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-preact-pure';
import HotelDetails from './hotel.component'
import { BookingResponse } from '../types/booking';

configure({ adapter: new Adapter })



const data = {"holidays":[{"totalPrice":10717.95,"pricePerPerson":5358.98,"depositPerPerson":5358.98,"webDiscount":0.00,"deposit":10717.95,"hotel":{"id":"H1778","name":"Kimpton Hotel Eventi","boardBasis":"Non Refundable","content":{"name":"Kimpton Hotel Eventi","virginView":"It may sit in one of the world&#x2019;s priciest zip codes, but the radically revamped Kimpton Hotel Eventi has taken over an entire block of Manhattan &#x2013; proudly showing off that fact with a wall of street-level windows giving passers-by glimpses of its dining and drinking venues. Of course, as a guest, you get to experience the glitzy world beyond those windows (and beyond the view-grabbing floor-to-ceiling windows in every guestroom). Part chic hotel, part art gallery (both in keeping with its artsy Chelsea address), its new lobby feels more like a designer&#x2019;s living room thanks to the fashion-forward furniture, coffee table books, and warmly lit artworks. And, within four blocks of the Empire State Building, The High Line, and Macy&#x2019;s, there&#x2019;s no shortage of dining outside, but Chef Laurent Tourondel has made &#x2018;dining in&#x2019; a must, with his Italian-influenced and industrial-styled L&#x2019;Amico and The Vine.","telephoneBookableOnly":false,"vRating":"4+","hotelDescription":"Encompassing an entire block of Sixth Avenue and crammed with conceptual art pieces, this hotel blends signature Kimpton hospitality with innovative nods to its neighbourhood.","atAGlance":["Floor to ceiling windows in all rooms","Italian-inspired American dining","Spa","Complimentary bikes"],"location":{"lat":40.74718,"lon":-73.989685},"parentLocation":"Midtown, New York","images":[{"RESULTS_CAROUSEL":{"url":"//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/538284/538284-1-results_carousel.jpg?version=20"},"MOBILE_MAIN":{"url":"//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/538284/538284-1-mobile_main.jpg?version=20"},"IMAGE_DESCRIPTION":""},{"RESULTS_CAROUSEL":{"url":"//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/538284/538284-2-results_carousel.jpg?version=20"},"MOBILE_MAIN":{"url":"//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/205/538284/538284-2-mobile_main.jpg?version=20"},"IMAGE_DESCRIPTION":""},{"RESULTS_CAROUSEL":{"url":"//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/538284/538284-3-results_carousel.jpg?version=20"},"MOBILE_MAIN":{"url":"//d3hk78fplavsbl.cloudfront.net/assets/common-prod/hotel/300/538284/538284-3-mobile_main.jpg?version=20"},"IMAGE_DESCRIPTION":""}],"keyFeatures":[{"description":"Internet Access","name":"internet-access"},{"description":"Restaurant","name":"restaurant"},{"description":"Fitness Centre/Gym","name":"fitness-centre-gym"},{"description":"Spa","name":"spa"},{"description":"Close to City Centre","name":"close-to-city-centre"}],"urlName":"kimpton-hotel-eventi","url":"/usa/new-york/midtown/kimpton-hotel-eventi","parentUrlName":"midtown","holidayType":[],"boardBasis":["Room Only"],"hotelLocation":["Close to City Centre"],"accommodationType":["Room"],"hotelFacilities":["Restaurant","Spa","Fitness Centre/Gym","Internet Access"],"familyKids":[],"activities":[],"features":[],"starRating":"4","resortFees":false,"salesMessages":[],"propertyType":"Hotel","hotelEdits":[]}},"locationWidened":false,"virginPoints":21436,"tierPoints":400,"departureDate":"2022-08-02","selectedDate":"2022-08-02"}]}

const json:BookingResponse =  data as any





describe('Hotel Description Component', () => {

    it('No Data Found', async () => {
        const wrapper = shallow(<HotelDetails holidays = {[]} />)
        expect(wrapper.find('h1').text()).toEqual("No Data Found")
        expect(wrapper.find('h1')).toBeDefined()
    })

    it('Render Hotel details', async () => {
        const wrapper = shallow(<HotelDetails holidays = {json.holidays} />)
        expect(wrapper.find("button")).toHaveLength(3)
        expect(wrapper.find("img")).toHaveLength(1)
        expect(wrapper.find("#availability").text()).toBe("See availability")
        expect(wrapper.find("#detailsHead").text()).toBe("Hotel Details")
    })

    

})
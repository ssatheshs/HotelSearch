/** @jsx h */
import { h, JSX } from 'preact';
import * as styles from './hotel.module.less'
import { Option } from "./select.component"
import {Hotel, Holiday, HotelContent } from '../types/booking';
import { AMENITIES, PRICES, RATINGS as starRating } from "../consts/hotel"


interface HotelDetailsProps  {
  holidays?: any
}

export default function HotelDetails(props: HotelDetailsProps): JSX.Element {
  const { holidays,...other } = props
  console.log(holidays)
  return (
    <div 
      class={`${styles["column-right"]} right`} 
    >
    {      
      ( Array.isArray(holidays) && holidays?.length > 0 )? holidays?.map((item :Holiday, index: number) => {
          const hotelDetails:Hotel = item?.hotel
          const hotelContent: HotelContent = item?.hotel.content
          return(
            <section className = {styles["sectionWrapper"]}> 
              <div className={styles["searchItem"]}>
                <img
                    src={ hotelContent?.images?.length >= 0 ?hotelDetails?.content?.images[0].RESULTS_CAROUSEL.url:'' }
                    alt=""
                    className={styles["siImg"]}
                />
                <div className={styles["siDesc"]}>
                    <h1 className={styles["siTitle"]}>{hotelDetails.name}</h1>
                    <span className={styles["siDistance"]}>{hotelContent?.parentLocation}</span>
                    <span className={styles["siTaxiOp"]}>
                      <span>{"Virgin rating "}</span>
                      <button id="vRating" style={{visibility:hotelContent?.vRating?"visible":"hidden"}} className={styles["siTaxBtn"]}>{hotelContent?.vRating}</button>
                    </span>
                    <span className={styles["siSubtitle"]}>
                      Key Features
                    </span>
                    <div className={styles["siFeatures"]}>
                      <ul >
                        {
                          hotelContent?.hotelFacilities.map((facility:string, index: number ) => <li key={ facility+index }>{facility}</li> )
                        }
                      </ul>
                    </div>                  
                </div>
                <div className={styles["siDetails"]}>
                    <div className={styles["siRating"]}>
                    <span>{ starRating.find(star => star.value == hotelContent.starRating)?.description }</span>
                    <button id="starRating"  style={{visibility:hotelContent?.starRating?"visible":"hidden"}}>{hotelContent?.starRating}</button>
                    </div>
                    <div className={styles["siDetailTexts"]}>
                    <span className={styles["siPrice"]}>Rs {item?.pricePerPerson}</span>
                    <span className={styles["siTaxOp"]}>Rs {item?.totalPrice} total</span>
                    <button id="availability" className={styles["siCheckButton"]}>See availability</button>
                    </div>
                </div>              
              </div>
              <div className={styles["tabWrapper"]} >
                  <h1 id="detailsHead" className={styles["detailsHeader"]}>Hotel Details</h1>
                  <div className={styles["detailsCls"]}>
                      {hotelContent.hotelDescription}
                  </div>
              </div>
            </section> 
          )
      }):<h1>No Data Found</h1>
    }
    </div>
  )
}
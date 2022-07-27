export interface PartyComposition {
    adults: number
    childAges: number[]
    infants: number
}

export interface BookingRequest {
    bookingType: string
    location: string
    departureDate: string
    duration: number
    gateway: string
    partyCompositions: PartyComposition[]
}

export interface BookingResponse {
    holidays: Holiday[]
}

export interface Holiday {
    totalPrice: number
    pricePerPerson: number
    flyingClubMiles: number
    virginPoints: number
    tierPoints: number
    departureDate: string
    selectedDate: string
    hotel: Hotel
}

export interface Hotel {
    id: string
    name: string
    boardBasis: string
    content: HotelContent
}

export interface HotelContent {
   name: string
   vRating: number | string
   hotelDescription: string
   atAGlance: string[]
   parentLocation: string
   images: HotelImage[]   
   holidayType: string[]
   boardBasis: string[]
   hotelLocation: string[]
   accommodationType: string[]
   hotelFacilities: string[]
   starRating: number | string
   propertyType: string
   keyFeatures: KeyFeatures[]
}

export interface HotelImage {
    RESULTS_CAROUSEL: Image
}

export interface Image {
    url: string
}

export interface KeyFeatures {
    description: string,
    name: string
}
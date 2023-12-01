import { fetchApi } from "../helper/network/fetch";
import API_ROUTES from "../helper/network/api-routes";
export const PRODUCT_DETAILS = 'PRODUCT_DETAILS'

const productDetailsAction= (data : any)=>(
    {
        type : PRODUCT_DETAILS,
        data
    }
)

export function productDetails(productSkuId="10022010")
{
    let body = {
        "requestPayload": {
            "filter": {
                "productSkuId": parseInt(productSkuId),
                "@type": "Filter"
            },
            "pageNumber": 0,
            "pageSize": 1,
            "queryTerm": " ",
            "sort": {
                "SP": "asc",
                "expressDelivery": "desc"
            }
        }
    }
    return function(dispatch : any){
        return fetchApi({url : API_ROUTES.getProductDetails,body : body})
        .then((res)=>{
            dispatch(productDetailsAction(res))
        },
        error =>{
            console.log("Error");
        }
        )
    }
}
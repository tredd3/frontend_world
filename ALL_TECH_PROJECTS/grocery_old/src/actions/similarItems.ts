import { fetchApi } from "../helper/network/fetch";
import API_ROUTES from "../helper/network/api-routes";
export const SIMLAR_ITEMS = 'SIMILAR_ITEMS'

const similarItemsAction=(data : any)=>(
    {
        type : SIMLAR_ITEMS,
        data
    }
)
export function similarItems(categoryId="75", productSkuId="10005599"){
   let body = {"requestPayload":{"filter":{"@type":"Filter","categoryId":categoryId},"pageNumber":0,"pageSize":20,"productSkuId":productSkuId,"queryTerm":" ","sort":{},"type":1}}

    return function(dispatch : any)
   {
        return fetchApi({
            url : API_ROUTES.getSimilarItems,
            body : body
        })
        .then((res)=>{
            dispatch(similarItemsAction(res))
        },
        error=>{
            console.log("Similar Items API not working properly");
        })
   }
   
}
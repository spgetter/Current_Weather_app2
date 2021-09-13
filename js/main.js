const getData = async (city_name) => {
    // clientId = [key needs to be here]; // key located in .env file, importing it seems to be difficult  
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${clientId}`)
    return result.json();

}
// load_city();
// async function load_city(){
//     let query_city = document.querySelector('#city');
//     let thisCity = await query_city.value;
//     console.log('1',thisCity)
//     if (thisCity == ""){
//         thisCity = "Denver";
//     }
//     console.log('2',thisCity)
//     build_cities(thisCity,'Berlin','Shanghai','Jakarta','Tokyo');
// }
const form = document.querySelector('#testDataForm')
form.addEventListener('submit', ( event ) => {
    event.preventDefault();

    let query_city = document.querySelector('#city');
    let thisCity = query_city.value;
    if (thisCity == ""){
        thisCity = "Denver";
    }
    build_cities(thisCity,'Berlin','Moscow','Mumbai','Tokyo');
}) // This event listener donated by Josh, as mine (above, commented out) was failing miserably


const create_list = ( city_number, city_name, current, high, low, forecast, humidity ) => {
    for(let y =1;y < 7;y++){
        switch(y){
            case 1:
                document.getElementById(`${city_number}_1`).innerHTML = "";
                document.getElementById(`${city_number}_1`).insertAdjacentHTML("beforeend",city_name);
                break;
            case 2:
                document.getElementById(`${city_number}_2`).innerHTML = "";
                document.getElementById(`${city_number}_2`).insertAdjacentHTML("beforeend",`${Math.round(current)}℉ / ${Math.round(5/9*(current-32))}℃`);
                break;
            case 3:
                document.getElementById(`${city_number}_3`).innerHTML = "";
                document.getElementById(`${city_number}_3`).insertAdjacentHTML("beforeend",`${Math.round(high)}℉ / ${Math.round(5/9*(high-32))}℃`);
                break;
            
            case 4:
                document.getElementById(`${city_number}_4`).innerHTML = "";
                document.getElementById(`${city_number}_4`).insertAdjacentHTML("beforeend",`${Math.round(low)}℉ / ${Math.round((low-32)*5/9)}℃`);
                break;
                
            case 5:
                document.getElementById(`${city_number}_5`).innerHTML = "";
                document.getElementById(`${city_number}_5`).insertAdjacentHTML("beforeend", `${forecast}  <img src="images/${show_icon(forecast)}.png" alt="${forecast}" width="50">`);
                break;
            
            case 6:
                document.getElementById(`${city_number}_6`).innerHTML = "";
                document.getElementById(`${city_number}_6`).insertAdjacentHTML("beforeend",`${humidity}%`);
                break;
            
            default :
                console.log('Bad Index', y)
            
        }

    }
}

function show_icon(forecast){
    switch(forecast){
        case 'Clouds':
            return "Clouds";
            break;
        case 'Clear':
            return "Clear";
            break;
        case 'Snow':
            return "Snow";
            break;
        case 'Rain':
            return "Rain";
            break;
        case 'Drizzle':
            return "Drizzle";
            break;
        case 'Thunderstorm':
            return "Thunderstorm";
            break;
        default:
            return "Other";

    }


}

async function build_cities(first,second,third,fourth,fifth){
    for(x=1;x<6;x++){
        switch(x){
            case 1:
                this_city = await getData(first);
                create_list(x,this_city.name,this_city.main.temp,this_city.main.temp_max,this_city.main.temp_min,this_city.weather[0].main,this_city.main.humidity)
                break;
            case 2:
                this_city = await getData(second);
                create_list(x,second,this_city.main.temp,this_city.main.temp_max,this_city.main.temp_min,this_city.weather[0].main,this_city.main.humidity)
                break;
            case 3:
                this_city = await getData(third);
                create_list(x,third,this_city.main.temp,this_city.main.temp_max,this_city.main.temp_min,this_city.weather[0].main,this_city.main.humidity)
                break;
            case 4:
                this_city = await getData(fourth);
                create_list(x,fourth,this_city.main.temp,this_city.main.temp_max,this_city.main.temp_min,this_city.weather[0].main,this_city.main.humidity)
                break;
            case 5:
                this_city = await getData(fifth);
                create_list(x,fifth,this_city.main.temp,this_city.main.temp_max,this_city.main.temp_min,this_city.weather[0].main,this_city.main.humidity)
                break;
            default:
                console.log('undefined')
        }
    }
}

const DOM_Elements = {
    table_row : '.table_row',
    table_row1 : '.table_row1'

}
const clear_data = () => {
    document.getElementsByClassName(DOM_Elements.table_row).innerHTML = "";
    document.getElementsByClassName(DOM_Elements.table_row1).innerHTML = "";
}

<template>
    <v-container>
        <v-text-field v-model="latitude" label="緯度" class="input-group--focused"></v-text-field>
        <v-text-field v-model="longitude" label="經度" class="input-group--focused"></v-text-field>
        <v-select v-model="appearedTimeOfDay" label="出現時間" attach :items="appearedTimeOfDayTypes" ></v-select>
        <v-select v-model="appearedDayOfWeek" label="出現星期" attach :items="WeekTypes" ></v-select>
        <v-select v-model="terrainType" label="地形" attach :items="terrainTypes" ></v-select>
        <v-select v-model="weather" label="天氣" attach :items="weatherTypes" ></v-select>
        <v-select v-model="weatherIcon" label="pmgo天氣圖" attach :items="weatherIconTypes" ></v-select>
        <v-select v-model="continent" label="大洋大洲" attach :items="contientTypes" ></v-select>
        <v-text-field v-model="temperature" label="溫度" class="input-group--focused"></v-text-field>
        <v-text-field v-model="population_density" label="人口密度" class="input-group--focused"></v-text-field>
        <v-text-field v-model="gymDistanceKm" label="最近道館距離" class="input-group--focused"></v-text-field>
        <v-text-field v-model="pokestopDistanceKm" label="最近補給站距離" class="input-group--focused"></v-text-field>
         <v-layout row align-center>
        <font size = "4"><p>靠近水:&nbsp;&nbsp;&nbsp;</p></font>
        <v-checkbox
            v-model="closeToWater"
        ></v-checkbox>
        <font size = "4"><p>都市:&nbsp;&nbsp;&nbsp;</p></font>
        <v-checkbox
            v-model="urban_rural"
        ></v-checkbox>
        </v-layout>
        <center><v-btn>上傳</v-btn></center>
    </v-container>
</template>

<script>
import api from "../../store/api.js"
export default {
    data(){
        return {
            latitude:'', 
            longitude:'',
            appearedTimeOfDay:'',
            appearedDayOfWeek:'',
            WeekTypes:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            terrainType:'',
            terrainTypes:['Water','Evergreen Needleleaf forest','Evergreen Broadleaf forest','Deciduous Needleleaf forest','Deciduous Broadleaf forest','Mixed forest','Closed shrublands','Open shrublands','Woody savannas','Savannas','Grasslands','Permanent wetlands','Croplands','Urban and built-up','Cropland/Natural vegetation mosaic','Snow and ice','Barren or sparsely vegetated'
            ],
            closeToWater:false,
            weather:'',
            continent:'',
            contientTypes:['Asia','Europe','America','Africa','Australia','America/Indiana','Pacific','Atlantic'],
            temperature:'',
            appearedTimeOfDayTypes:['morning','afternoon','evening','night'],
            weatherIcon:'',
            population_density:'',
            urban_rural:false,
            gymDistanceKm:'', 
            pokestopDistanceKm:'',
            weatherTypes:['Foggy Clear', 'PartlyCloudy', 'MostlyCloudy', 'Overcast', 'Rain', 'BreezyandOvercast', 'LightRain', 'Drizzle', 'BreezyandPartlyCloudy', 'HeavyRain', 'BreezyandMostlyCloudy', 'Breezy', 'Windy', 'WindyandFoggy', 'Humid', 'Dry', 'WindyandPartlyCloudy', 'DryandMostlyCloudy', 'DryandPartlyCloudy', 'DrizzleandBreezy', 'LightRainandBreezy', 'HumidandPartlyCloudy', 'HumidandOvercast', 'RainandWindy'
            ],
            weatherIconTypes:['fog', 'clear-night', 'partly-cloudy-night', 'partly-cloudy-day', 'cloudy', 'clear-day', 'rain', 'wind']
        }
    }
}
</script>

<style>

</style>

<template>
    <v-container>
        <center><font size="4"><p>環境資料</p></font></center>
        <v-text-field v-model="predictData.latitude" label="緯度" class="input-group--focused"></v-text-field>
        <v-text-field v-model="predictData.longitude" label="經度" class="input-group--focused"></v-text-field>
        <v-select v-model="predictData.appearedTimeOfDay" label="出現時間" attach :items="appearedTimeOfDayTypes" ></v-select>
        <v-select v-model="predictData.appearedDayOfWeek" label="出現星期" attach :items="WeekTypes" ></v-select>
        <v-select v-model="predictData.terrainType" label="地形" attach :items="terrainTypes" ></v-select>
        <v-select v-model="predictData.weatherIcon" label="pmgo天氣圖" attach :items="weatherIconTypes" ></v-select>
        <v-select v-model="predictData.continent" label="大洋大洲" attach :items="contientTypes" ></v-select>
        <v-text-field v-model="predictData.temperature" label="溫度" class="input-group--focused"></v-text-field>
        <v-text-field v-model="predictData.population_density" label="人口密度" class="input-group--focused"></v-text-field>
        <v-text-field v-model="predictData.gymDistanceKm" label="最近道館距離" class="input-group--focused"></v-text-field>
        <v-text-field v-model="predictData.pokestopDistanceKm" label="最近補給站距離" class="input-group--focused"></v-text-field>
         <v-layout row align-center>
        <font size = "4"><p>靠近水:&nbsp;&nbsp;&nbsp;</p></font>
        <v-checkbox
            v-model="predictData.closeToWater"
        ></v-checkbox>
        <font size = "4"><p>都市:&nbsp;&nbsp;&nbsp;</p></font>
        <v-checkbox
            v-model="predictData.urban_rural"
        ></v-checkbox>
        </v-layout>
        <center><v-btn @click="predict()">上傳</v-btn></center>
        <br>
        <v-spacer></v-spacer>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <br>
        <center><font size="4"><p>預測結果(TOP10)</p></font></center>
        <v-layout row v-bind:key="n" v-for="n in predictResult">
            <v-layout column>
                <p>No.{{n}}</p>
                <p>名稱:{{pokemonName[n-1]}}</p>
                <v-img :src="'../../static/'+ n + '.png'" height="100" contain></v-img>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import api from "../../store/api.js"
export default {
    data(){
        return {
            predictData: {
                latitude:'12', 
                longitude:'12',
                appearedTimeOfDay:'morning',
                appearedDayOfWeek:'Monday',
                terrainType:'Water',
                closeToWater:false,
                weather:'BreezyandPartlyCloudy',
                continent:'Asia',
                temperature:'30',
                weatherIcon:'fog',
                population_density:'1',
                urban_rural:false,
                gymDistanceKm:'10', 
                pokestopDistanceKm:'10'
            },    
            WeekTypes:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            terrainTypes:['Water','Evergreen Needleleaf forest','Evergreen Broadleaf forest','Deciduous Needleleaf forest','Deciduous Broadleaf forest','Mixed forest','Closed shrublands','Open shrublands','Woody savannas','Savannas','Grasslands','Permanent wetlands','Croplands','Urban and built-up','Cropland/Natural vegetation mosaic','Snow and ice','Barren or sparsely vegetated'
            ],
            contientTypes:['Asia','Europe','America','Africa','Australia','America/Indiana','Pacific','Atlantic'],
            appearedTimeOfDayTypes:['morning','afternoon','evening','night'],
            weatherTypes:['Foggy Clear', 'PartlyCloudy', 'MostlyCloudy', 'Overcast', 'Rain', 'BreezyandOvercast', 'LightRain', 'Drizzle', 'BreezyandPartlyCloudy', 'HeavyRain', 'BreezyandMostlyCloudy', 'Breezy', 'Windy', 'WindyandFoggy', 'Humid', 'Dry', 'WindyandPartlyCloudy', 'DryandMostlyCloudy', 'DryandPartlyCloudy', 'DrizzleandBreezy', 'LightRainandBreezy', 'HumidandPartlyCloudy', 'HumidandOvercast', 'RainandWindy'
            ],
            weatherIconTypes:['fog', 'clear-night', 'partly-cloudy-night', 'partly-cloudy-day', 'cloudy', 'clear-day', 'rain', 'wind'],
            predictResult:[],
            pokemonName:['妙蛙種子','妙蛙草','妙蛙花','小火龍','火恐龍','噴火龍','傑尼龜','卡咪龜','水箭龜','綠毛蟲','鐵甲蛹','巴大蝶','獨角蟲','鐵殼蛹','大針蜂','波波','比比鳥','大比鳥','小拉達','拉達','烈雀','大嘴雀','阿柏蛇','阿柏怪','皮卡丘','雷丘','穿山鼠','穿山王','尼多蘭','尼多娜','尼多后','尼多朗','尼多力諾','尼多王','皮皮','皮可西','六尾','九尾','胖丁','胖可丁','超音蝠','大嘴蝠','走路草','臭臭花','霸王花','派拉斯','派拉斯特','毛球','摩魯蛾','地鼠','三地鼠','喵喵','貓老大','可達鴨','哥達鴨','猴怪','火爆猴','卡蒂狗','風速狗','蚊香蝌蚪','蚊香君','蚊香泳士','凱西','勇基拉','胡地','腕力','豪力','怪力','喇叭芽','口呆花','大食花','瑪瑙水母','毒刺水母','小拳石','隆隆石','隆隆岩','小火馬','烈焰馬','呆呆獸','呆殼獸','小磁怪','三合一磁怪','大蔥鴨','嘟嘟','嘟嘟利','小海獅','白海獅','臭泥','臭臭泥','大舌貝','刺甲貝','鬼斯','鬼斯通','耿鬼','大岩蛇','催眠貘','引夢貘人','大鉗蟹','巨鉗蟹','霹靂電球','頑皮雷彈','蛋蛋','椰蛋樹','卡拉卡拉','嘎啦嘎啦','飛腿郎','快拳郎','大舌頭','瓦斯彈','雙彈瓦斯','獨角犀牛','鑽角犀獸','吉利蛋','蔓藤怪','袋獸','墨海馬','海刺龍','角金魚','金魚王','海星星','寶石海星','魔牆人偶','飛天螳螂','迷唇姐','電擊獸','鴨嘴火獸','凱羅斯','肯泰羅','鯉魚王','暴鯉龍','拉普拉斯','百變怪','伊布','水伊布','雷伊布','火伊布','多邊獸','菊石獸','多刺菊石獸','化石盔','鐮刀盔','化石翼龍','卡比獸','急凍鳥','閃電鳥','火焰鳥','迷你龍','哈克龍','快龍','超夢','夢幻'],
            dialog:false,
        }
    },
    methods:{
        predict(){
            let obj = {}
            for(var i in this.predictData){
                if(i == "urban_rural")
                {
                    console.log("test")
                    if(this.predictData[i] == true)
                    {
                        obj['urban'] = true
                        obj['rural'] = false
                    }
                    else{
                        obj['urban'] = false
                        obj['rural'] = true
                    }
                }
                else if(i == "terrainType")
                {
                    obj[i] = (this.terrainTypes.indexOf(this.predictData[i]) + 1)
                }
                else{
                    obj[i] = this.predictData[i]
                }
            }
            this.dialog = true
            let self = this
            api.predict(obj).then(res=>{
                self.predictResult = res.data.ids
                self.dialog = false
            }).catch(error=>{

            })
        }
    }
}
</script>

<style>

</style>

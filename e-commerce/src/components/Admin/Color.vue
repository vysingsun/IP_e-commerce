
<template>
    <div class="bg-slate-100 w-4/5 p-6">
        <div class="w-full flex justify-between bg-white p-5 rounded-t-lg ">
            <div class="font-medium text-base px-5 py-2.5 ml-2">Color</div>
            <div>
                <button @click="showPopup = true" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Add New</button>
            </div>
        </div>
        <!-- list table -->
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-sm text-gray-900 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 w-8  py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="color in this.colors" :key="color._id" class="bg-white dark:bg-gray-800">
                        <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{color._id}}
                        </td>
                        <td class="px-6 py-4">
                            {{color.color}}
                        </td>
                        <td class="px-6 py-4">
                            {{color.product.title}}
                        </td>
                        <td class="px-6 py-4">
                            <div>Edit</div>
                            <form>
                                <button @click="deleteColor(color._id)">Delete</button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <Popup v-if="showPopup">
        <form>
            <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">                   
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="mt-3 text-center  sm:mt-0 sm:text-left">
                                    <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Add new Color</h3>
                                    <div class="mt-2">
                                        <label for="">Product</label>
                                        <select  id="default" v-model="product" name="product" class="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product">
                                            <option disabled selected>Choose a product</option>
                                            <option v-for="product in products" :key="product._id" :value="product._id">{{product.title}}</option>
                                           
                                        </select>
                                    </div>
                                    <div class="mt-2">
                                        <input type="text" name="color" v-model="color"  aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description">
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button v-on:click="addPrice()"  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Add</button>
                                <button @click="showPopup = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </Popup>
    
</template>

<script>
    
    import colorApi from '../../libs/Admin/color'
    import AddCatePopup from './AddCatePopup.vue'
    import productApi from '../../libs/Admin/Product'
    import axios from 'axios'
    export default {
        name: "App",
        components: {
            AddCatePopup
        },
        data(){
            return{
                colors: [],
                products: [],
                showPopup: false,
                product: '',
                color: '',
            }
        },
        async mounted(){
            this.colors = await colorApi.getColor();
            // this.colors = this.colors.data
            // console.log(this.colors);

            this.products = await productApi.getProductApi();
            this.products = this.products.data;
        },
        methods: {
            async addPrice(){
                let result = await axios.post("http://localhost:3001/color/create",{
                    product:this.product,
                    color:this.color
                    
                });
                console.log("called");
                console.log(result);
            },
            deleteColor(colorId){
                if(confirm('Are you sure ?')){
                    axios.post(`http://localhost:3001/color/delete/${colorId}`)
                        .then(res => {
                            console.log("deleted?");
                            
                        }); 
                }
            }
        }
    };
</script>

<style>
        
    /* Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
    display: none;
    }

    .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    }
        
</style>
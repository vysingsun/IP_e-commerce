<template class="bg-black">
    <div id="i" class="w-[500px] h-[600px] flex items-center border-[1px] border-gray-700 m-auto p-6">
        <div class="w-full">
            <div class="flex justify-center">
                <img class="w-[200px]" src="https://cdn-icons-png.flaticon.com/512/428/428933.png" alt="">
            </div>
            
                <label for="">Email</label><br>
                <input class="w-full bg-[#e8f0fe] my-4 p-2 px-4" type="text" v-model="email" placeholder="Enter email"><br>
                <label for="">Password</label><br>
                <input class="w-full bg-[#e8f0fe] my-4 p-2 px-4" type="password" v-model="password" placeholder="Enter password">
                <div class="w-full flex justify-end">
                    <button >
                    Forgot
                    <span class="text-[#04a96d]">password?</span>
                    </button>
                </div>
                <button class="w-full bg-[#018301] text-white py-2 my-4" id="login" v-on:click="login">Login</button> 
            
        </div>
    </div>
    <div>
    <img src="https://mega.nz/file/PgQRCBbA#f-CobTyfbuvBWQNIm4vxtEbIQj2n0TiyinY7hPkMLXE" alt="">
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    login(){
        // console.log(this.email);
        // console.log(this.password);
      fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
          },
        // credentials: "include",
        body: JSON.stringify({
          "email":this.email, 
          "password":this.password
        })
      }).then(res => {
        return res.json();
      }).then((data) => {
        this.$store.commit('setUserId', data.data.user._id)
        console.log(this.$store.getters.getUserId);
        if(data.success == true){
          this.$router.push({name : 'home/logined'})
        }
      })
    }
  }
};
</script>
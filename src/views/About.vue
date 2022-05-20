<template>
<nav-bar class="z-50"></nav-bar>
 <div class="h-screen flex justify-center items-center body" id="bodyAbout" >
    <div class=" text-white p-3 rounded text-center py-8 hover:shadow-md cursor-pointer ml-10 mb-20"
         v-for="members in member" :key="members.id">
         <div class="container">
			<div class="avatar">
				<img :src="getImage(members.img)" alt="Members picture" />
			</div>
			<div class="content">
				<h1>{{members.duty}}</h1>
				<p>—— {{members.fullname}} ——</p>
				<p>— {{members.studentcode}} —</p>
			</div>
		</div>
    </div>
</div> 


<footer-com />
</template>
<script>
  export default {
    name: 'about',
    data() {
      return{
      member: [{
                id:1,
                fullname:'Paksawat Rakthai',
                duty:'Front-End / Dev-op / Database',
                studentcode:'62130500071',
                img:'Nice.jpg'},
                {
                id:2,
                fullname:'Varot Tirakhuntorn',
                duty:'Back-End / Dev-op / Database',
                studentcode:'62130500080',
                img:'Non.jpg'},
                {
                id:3,
                fullname:'Wuttichai Arayasook',
                duty:'Front-End / Dev-op / Database',
                studentcode:'62130500086',
                img:'Pao.jpg'}]
    }
    },
	methods: {
		getImage(name){
			return require(`@/assets/teams-pic/${name}`)
		}
	}
  }
</script>
<style scoped>
.zoom {
  transition: transform 0.3s,
}
.zoom:hover {
  transform: scale(1.15)
}
body,
html {
	height: 100%;
	margin: 0;
	padding: 0;
	font-family: 'Helvetica', sans-serif;
	
}

#bodyAbout {
  background: rgb(26, 188, 156);
	background: -moz-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
	background: -webkit-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
	background: linear-gradient(135deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
}

h1 {
	font-size: 20px;
	margin: 10px 0 0 0;
	font-weight: lighter;
	text-transform: uppercase;
	color: snow;
}

p {
	font-size: 18px;
	font-weight: light;
	color: snow;
}


@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
		transform: translatey(-20px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
		transform: translatey(0px);
	}
}

.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.avatar {
	width: 300px;
	height: 300px;
	box-sizing: border-box;
	border: 5px white solid;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
	transform: translatey(0px);
	animation: float 6s ease-in-out infinite;

}

.content {
	width: 100%;
	max-width: 600px;
	padding: 20px 40px;
	box-sizing: border-box;
	text-align: center;
}

.suppoprt-me {
	display: inline-block;
	position: fixed;
	bottom: 10px;
	left: 10px;
	width: 20vw;
	max-width: 250px;
	min-width: 200px;
	z-index: 9;

}
</style>

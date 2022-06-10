<template>
	<my-link to="/pages/login" navType="push">
		<div class="container"></div>
	</my-link>
</template>

<script>
export default {
	data() {
		return {
			title: "Hello",
		};
	},
	onLoad() { },
	methods: {
	},
};
</script>

<style scoped>
.container {
	height: 100vh;
	background: rgb(225, 205, 205);
	background-image: url("https://minitest-1309252537.cos.ap-beijing.myqcloud.com/hero.jfif");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: -800rpx 0;
}

.link {
	height: 100vh;
	background: #000;
}
</style>

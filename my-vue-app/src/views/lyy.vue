<template>
    <div>
        <h1>Hello World</h1>
        <button @click="handleClick">Click me</button>
    </div>
</template>


<script>
export default {
    name: 'Lyy',
    methods: {
        handleClick() {
            console.log('Button clicked');
        }
    }


}
</script>



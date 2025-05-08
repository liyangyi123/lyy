<template>
    <div>
        <h1>Hello World</h1>
        <h2>Hello World</h2>
        <h3>Hello World</h3>
        
        <button @click="handleClick">Click me</button>
    </div>
</template>

<script>
export default {
    name: 'Yangyi',
    methods: {
        handleClick() {
            console.log('Button clicked');
        }
    }
}
</script>




<template>
    <div class="animate-pulse space-y-6">               
        <div class="w-52 bg-gray-300 h-6 rounded-md "></div>
        <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
        <div class="w-74 bg-gray-300 h-20 rounded-md "></div>
        <div style="display: grid; grid-template-columns: 1fr 2fr;" class="space-x-2 my-6 mb-0 py-5 border-t">
            <div class="space-y-1">
                <p class="font-medium text-gray-800 text-sm">SKU</p>
                <p class="font-medium text-gray-800 text-sm">Categories</p>
            </div>
            <div class="space-y-1">
                <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
                <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ProductSkeleton'
    }
</script>

<style lang="scss" scoped>

</style>
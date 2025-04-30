<template>
    <div class="showings-list">
        <slot name="showings"></slot>
    </div>
</template>


<style scoped>
    .showings-list {
        padding: 20px;
        /* background-color: #f8f9fa; */
        border-radius: 5px;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
    }
</style>

<!-- <script>
    import TimeConverterService from '@/services/TimeConverter.service';
    const date = new Date();
    export default {
        name: 'ShowingsList',
        props: {
            movieId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                showings: []
            }
        },
        components: {},
        methods:{
            getDate(date) {
                // var someDate = new Date();
                // var result = someDate.setDate(someDate.getDate() + offset);
                // return result.getDate() + "." + (result.getMonth() + 1);
                return TimeConverterService.convertDate(date);
            },
            getTime(time) {
                return TimeConverterService.convertTime(time);
            }
        }
    }
    onMounted(async () => {
        try {
            const response = await axios.get(APIURLService.getAPIUrl()+'/api/Showing/GetShowingsByMovieId', {
                params: {
                    movieId: this.movieId
                }
            }); 
            showings.value = response.data;
        } catch (error) {
            console.error('Error fetching showings:', error);
        }
    });
</script> -->

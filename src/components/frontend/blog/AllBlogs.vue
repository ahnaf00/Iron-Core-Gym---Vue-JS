<script setup>
import { ref,computed, watch, onMounted } from 'vue';
import BlogSidebar from './BlogSidebar.vue';
import BlogCard from './BlogCard.vue';
import BlogPagination from './BlogPagination.vue';
import api from '../../../axios.js';

const POSTS_PER_PAGE = 3

const allPosts = ref([])
const currentPage = ref(1)
const totalPages = ref(1)

const fetchPosts = async () => {
    try{
        const response = await api.get(`/blogs?page=${currentPage.value}`);
        const data = response.data.data;

        allPosts.value = data.map(p =>({
            id:p.id,
            category:p.category,
            date:new Date(p.published_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
            author:p.author?.name || 'Unknown',
            comments:0,
            title: p.title,
            slug:p.slug,
            exerpt:p.exerpt,
            image:p.thumbnail_url || 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop'
        }));

        totalPages.value = response.data.meta.last_page
    }
    catch(err)
    {
        console.error("Failed to fetch blogs", error);
    }
}

watch(currentPage, () => {
    fetchPosts();
})

onMounted(() => {
    fetchPosts();
})
</script>

<template>
    <section class="py-24 bg-dark-surface">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col lg:flex-row gap-12">

                <!-- Main Content (2/3) -->
                <div class="w-full lg:w-2/3 space-y-16">
                    <BlogCard
                        v-for="post in allPosts"
                        :key="post.id"
                        :post="post"
                    ></BlogCard>
                    
                    <BlogPagination
                        v-model:currentPage="currentPage"
                        :total-pages="totalPages"
                    ></BlogPagination>

                </div>

                <!-- Sidebar (1/3) -->
                <BlogSidebar></BlogSidebar>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
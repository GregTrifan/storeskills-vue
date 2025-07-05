<script setup lang="ts">
import { onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductsGrid from '@/components/product/ProductsGrid.vue';
import CategoriesDrawer from '@/components/product/CategoriesDrawer.vue';
import CategoriesList from '@/components/product/CategoriesList.vue';
import { Search, X } from 'lucide-vue-next';
import type { SortOption } from '@/stores/products';
import { useProductsData } from '@/composables/productsView/useProductsData';
import { SpinnerLarge } from '@/components/spinners';

// Get the store instance, which also provides the context to children
const store = useProductsData();

// Destructure the store for local use
const {
    loading,
    error,
    searchQuery,
    sortBy,
    sortOptions,
    isEmpty,
    handleSortChange: handleSortChangeStore,
    handleSearch,
    resetSearch,
    fetchProducts,
} = store;

const onSearchClear = () => {
    resetSearch();
};

const onSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    handleSearch(target.value);
};

// Fetch products on component mount
onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Mobile Categories Drawer -->
        <CategoriesDrawer />

        <div class="flex flex-col lg:flex-row">
            <!-- Desktop Sidebar -->
            <aside
                class="hidden lg:block w-72 border-r border-border h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
                <div class="p-6">
                    <h2 class="text-xl font-semibold mb-4">Categories</h2>
                    <CategoriesList />
                </div>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-6">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
                    <SpinnerLarge />
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="text-center py-12">
                    <p class="text-destructive">Error loading products. Please try again.</p>
                    <Button @click="fetchProducts" class="mt-4">Retry</Button>
                </div>

                <!-- Success State -->
                <template v-else>
                    <div class="space-y-4 mb-8">
                        <div class="flex flex-col space-y-2">
                            <h1 class="text-3xl font-bold tracking-tight">Our Products</h1>
                            <p class="text-muted-foreground">Browse our curated collection of high-quality items</p>
                        </div>
                    </div>

                    <!-- Search and Sort -->
                    <div class="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                        <div class="relative flex-1 max-w-2xl">
                            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input :model-value="searchQuery" type="search" placeholder="Search products..."
                                class="w-full pl-10" @input="onSearchInput" />
                            <Button v-if="searchQuery" variant="ghost" size="icon"
                                class="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" @click="onSearchClear">
                                <X class="h-4 w-4" />
                            </Button>
                        </div>
                        <Select :model-value="sortBy"
                            @update:modelValue="(value) => handleSortChangeStore(value as SortOption)">
                            <SelectTrigger class="w-[200px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sort By</SelectLabel>
                                    <SelectItem v-for="option in sortOptions" :key="option.value" :value="option.value">
                                        {{ option.label }}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <!-- Empty State -->
                    <div v-if="isEmpty" class="text-center py-12">
                        <p class="text-muted-foreground">No products found</p>
                    </div>

                    <!-- Products Grid -->
                    <ProductsGrid v-else />
                </template>
            </main>
        </div>
    </div>
</template>

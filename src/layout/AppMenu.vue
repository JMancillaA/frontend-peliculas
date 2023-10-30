<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Cuenta',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Sign up', icon: 'pi pi-fw pi-id-card', to: '/' },
            { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
            { label: 'Cuenta', icon: 'pi pi-fw pi-user', to: '/' },
        ]
    },
    {
        label: 'Películas',
        items: [
            { label: 'Populares', icon: 'pi pi-fw pi-chart-bar', to: '/' },
            { label: 'Estrenos', icon: 'pi pi-fw pi-star', to: '/' },
            { label: 'Mejor calificados', icon: 'pi pi-fw pi-thumbs-up', to: '/' },
            { label: 'Recomendaciones', icon: 'pi pi-fw pi-step-forward', to: '/listadepelis' },
            { label: 'Tus vistos', icon: 'pi pi-fw pi-check-circle', to: '/listadepelis' },
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },   
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
        ]
    },
    {
        label: 'Get Started',
        items: [
            {
                label: 'Documentation',
                icon: 'pi pi-fw pi-question',
                to: '/documentation'
            },
            {
                label: 'View Source',
                icon: 'pi pi-fw pi-search',
                url: 'https://github.com/primefaces/sakai-vue',
                target: '_blank'
            },
            {
                label: 'Nuxt Version',
                url: 'https://github.com/primefaces/sakai-nuxt',
                icon: 'pi pi-fw pi-star'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>

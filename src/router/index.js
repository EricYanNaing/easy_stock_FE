import { createRouter, createWebHistory } from "vue-router";
import InnerLayouts from "../layouts/InnerLayouts.vue";
import { useAuthStore } from "../store/auth";
import Auth from "../views/Auth/index.vue"
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Category from "../views/Category/Category.vue";
import Unit from "../views/Unit/Unit.vue";
import NotFound from "../components/NotFound.vue";
const routes = [
    {
        path: "/",
        name: 'InnerLayouts',
        component: InnerLayouts,
        meta : { requiresAuth: true },
        children: [
            {
                path: "",
                name: "Dashboard",
                component: Dashboard,
            },
            {
                path: '/category',
                name: 'Category',
                component: Category,
            },
            {
                path: '/unit',
                name: 'Unit',
                component: Unit,
            }
        ]
    },
    {
        path: "/auth",
        name: "Auth",
        component: Auth
    },
    {
        path: "/:patchMatch(.*)*",
        name: "NotFound",
        component: NotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to,from,next) => {
    const authStore = useAuthStore();
    if(to.meta.requiresAuth && !authStore.isLoggedIn){
        next('/auth');
    }
    if(authStore.isLoggedIn && to.path === '/auth'){
       return next('/');
    }
    else{
        next();
    }
})

router.afterEach((to, from) => {
    // Scroll to top after navigation
    window.scrollTo(0, 0);
}
);

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/pages/frontend/HomePage.vue'
import AboutPage from '../components/pages/frontend/AboutPage.vue'
import ClassesPage from '../components/pages/frontend/ClassesPage.vue'
import Trainers from '../components/pages/frontend/Trainers.vue'
import Pricing from '../components/pages/frontend/Pricing.vue'
import Blog from '../components/pages/frontend/Blog.vue'
import Contact from '../components/pages/frontend/Contact.vue'
import Adminlogin from '../components/admin/Adminlogin.vue'
import AdminLayout from '../components/admin/layout/AdminLayout.vue'
import AdminDashboard from '../components/admin/AdminDashboard.vue'
import AdminMembers from '../components/admin/AdminMembers.vue'
import AdminTrainers from '../components/admin/AdminTrainers.vue'
import AdminClasses from '../components/admin/AdminClasses.vue'
import AdminPricing from '../components/admin/AdminPricing.vue'
import AdminBlog from '../components/admin/AdminBlog.vue'
import AdminMessages from '../components/admin/AdminMessages.vue'
import AdminSettings from '../components/admin/AdminSettings.vue'
import { useAuthStore } from '../stores/auth.js'

const routes = [
    // ── Frontend ──────────────────────────────────────────────
    { path: '/',         name: 'home',     component: HomePage    },
    { path: '/about',    name: 'about',    component: AboutPage   },
    { path: '/classes',  name: 'classes',  component: ClassesPage },
    { path: '/trainers', name: 'trainers', component: Trainers    },
    { path: '/pricing',  name: 'pricing',  component: Pricing     },
    { path: '/blog',     name: 'blog',     component: Blog        },
    { path: '/contact',  name: 'contact',  component: Contact     },

    // Admin login (Public)
    {
        path:'/admin/login',
        name:'admin.login',
        component:Adminlogin,
        meta:{guestOnly:true}
    },

    // Admin panel (Protected)
    {
        path:'/admin',
        component:AdminLayout,
        meta:{requiresAuth:true},
        children: [
            { path: '',         name: 'admin.dashboard', component: AdminDashboard, meta: { requiresAuth: true, title: 'Dashboard' } },
            { path: 'members',  name: 'admin.members',   component: AdminMembers,   meta: { requiresAuth: true, title: 'Members'   } },
            { path: 'trainers', name: 'admin.trainers',  component: AdminTrainers,  meta: { requiresAuth: true, title: 'Trainers'  } },
            { path: 'classes',  name: 'admin.classes',   component: AdminClasses,   meta: { requiresAuth: true, title: 'Classes'   } },
            { path: 'pricing',  name: 'admin.pricing',   component: AdminPricing,   meta: { requiresAuth: true, title: 'Pricing'   } },
            { path: 'blog',     name: 'admin.blog',      component: AdminBlog,      meta: { requiresAuth: true, title: 'Blog'      } },
            { path: 'messages', name: 'admin.messages',  component: AdminMessages,  meta: { requiresAuth: true, title: 'Messages'  } },
            { path: 'settings', name: 'admin.settings',  component: AdminSettings,  meta: { requiresAuth: true, title: 'Settings'  } },
            ],
    },

    // ── 404 fallback ──────────────────────────────────────────
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
]

const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

router.beforeEach(async (to,from,next) => {
    const authStore = useAuthStore();

    if(!authStore.isAuth && sessionStorage.getItem('admin_auth') !== 'false')
    {
        await authStore.fetchUser();
    }

    if(to.meta.requiresAuth && !authStore.isAuth)
    {
        next({name:'admin.login'})
    }
    else if(to.meta.guestOnly && authStore.isAuth)
    {
        next({name:'admin.dashboard'});
    }
    else
    {
        next();
    }
})

export default router
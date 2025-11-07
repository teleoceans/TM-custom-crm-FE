<template>
  <nav
    class="fixed top-0 z-10 flex h-16 w-full items-center border-b px-4"
    :style="navbarStyle"
  >
    <div class="flex w-full items-center justify-between">
      <NavbarLeft>
        <!-- Desktop Sidebar Toggle -->
        <SidebarToggle variant="desktop" @click="$emit('toggle-sidebar')" />
        <!-- Mobile Sidebar Toggle -->
        <SidebarToggle variant="mobile" @click="$emit('toggle-sidebar')" />
        <!-- Logo -->
        <NavbarLogo />
        <!-- Search Bar -->
        <SearchBar v-model="searchQuery" />
      </NavbarLeft>

      <NavbarActions>
        <!-- Mobile Search Toggle -->
        <MobileSearchToggle @click="handleMobileSearchClick" />
        <!-- Notifications -->
        <NotificationDropdown>
          <a href="#" class="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700">
            <div class="shrink-0">
              <img
                class="h-11 w-11 rounded-full"
                src="http://localhost:1313/images/users/lana-byrd.png"
                alt="User avatar"
              />
            </div>
            <div class="w-full pl-3">
              <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                New message from <span class="font-semibold text-gray-900 dark:text-white">User</span>
              </div>
              <div class="text-xs font-medium text-primary-700 dark:text-primary-400">a few moments ago</div>
            </div>
          </a>
        </NotificationDropdown>
        <!-- Theme Toggle -->
        <ThemeToggle />
        <!-- User Menu -->
        <UserMenu>
          <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
            <li>
              <router-link
                to="/settings"
                class="group flex items-center gap-2 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="h-4 w-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Account
              </router-link>
            </li>
            <li>
              <router-link
                to="/settings"
                class="group flex items-center gap-2 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="h-4 w-4 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Settings
              </router-link>
            </li>
          </ul>
          <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
            <li>
              <a
                href="#"
                class="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-gray-600"
              >
                <svg
                  class="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
                Sign Out
              </a>
            </li>
          </ul>
        </UserMenu>
      </NavbarActions>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useThemeStyles } from '../../composables/useThemeStyles'
import SidebarToggle from './SidebarToggle.vue'
import NavbarLogo from './NavbarLogo.vue'
import NavbarLeft from './NavbarLeft.vue'
import NavbarActions from './NavbarActions.vue'
import SearchBar from './SearchBar.vue'
import MobileSearchToggle from './MobileSearchToggle.vue'
import NotificationDropdown from './NotificationDropdown.vue'
import ThemeToggle from './ThemeToggle.vue'
import UserMenu from './UserMenu.vue'

const { navbarStyle } = useThemeStyles()

/**
 * Main navigation bar component
 * @component
 */

defineEmits(['toggle-sidebar'])

const searchQuery = ref('')

const handleMobileSearchClick = () => {
  // Handle mobile search toggle if needed
  console.log('Mobile search clicked')
}
</script>

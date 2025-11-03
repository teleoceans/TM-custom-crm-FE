<template>

  <body class="bg-gray-50 dark:bg-gray-900 antialiased">
    <navbar></navbar>

    <div class="flex overflow-hidden bg-gray-50 pt-[62px] dark:bg-gray-900">
      <sidemenu></sidemenu>

      <div id="main-content" class="relative h-full w-full overflow-x-scroll bg-gray-50 dark:bg-gray-900 lg:ms-64">
        <main>
          <div class="px-4">
            <!-- Table Widget -->
            <table-sample></table-sample>
          </div>
        </main>
        <footerComponent></footerComponent>

      </div>
    </div>

  </body>
</template>

<script>
import Navbar from './components/Layouts/Navbar.vue';
import Sidemenu from './components/Layouts/Sidemenu.vue';
import FooterComponent from './components/Layouts/Footer.vue';
import TableSample from './components/TableSample.vue';

export default {
  components: {
    Navbar,
    Sidemenu,
    FooterComponent,
    TableSample,
  },
};
</script>

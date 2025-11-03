<template>
  <div class="mb-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800 md:p-6">
    <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white md:mb-6">Latest tickets</h2>
    <div class="border-b dark:border-gray-700 border-gray-200">
      <div class="flex flex-col-reverse items-center justify-between pb-4 md:flex-row md:space-x-4">
        <div class="flex w-full flex-col space-y-3 md:flex-row md:items-center md:space-y-0 lg:w-2/3">
          <form class="w-full flex-1 md:mr-4 md:max-w-sm">
            <label for="default-search" class="sr-only text-sm font-medium text-gray-900 dark:text-white">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg aria-hidden="true" class="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none"
                  stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input type="search" id="default-search"
                class="block w-full min-w-64 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Search invoice" required="" />
              <button type="submit"
                class="absolute bottom-0 right-0 top-0 rounded-r-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Search
              </button>
            </div>
          </form>
          <div class="flex items-center space-x-4">
            <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
              data-dropdown-ignore-click-outside-class="datepicker"
              class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
              type="button">
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="-ms-0.5 me-1.5 h-4 w-4"
                viewbox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clip-rule="evenodd" />
              </svg>
              Filters
              <svg class="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m19 9-7 7-7-7" />
              </svg>
            </button>
            <!-- Dropdown menu -->
            <form action="#" method="get" id="filterDropdown"
              class="z-10 hidden w-72 space-y-4 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-700"
              aria-labelledby="dropdownDefault">
              <h5 id="drawer-label" class="inline-flex items-center font-medium text-gray-500 dark:text-gray-400">Filter
              </h5>
              <div>
                <label for="tags" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="tags"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="" />
                </div>
              </div>
              <div>
                <label for="ticket-status"
                  class="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  Ticket status
                  <button data-popover-target="popover-ticket-status-description" type="button"
                    class="ms-1 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Show information</span>
                  </button>
                </label>
                <select id="ticket-status"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option selected>Any</option>
                  <option value="personal">Pending</option>
                  <option value="business">Solved</option>
                  <option value="education">Deleted</option>
                </select>
                <div id="popover-ticket-status-description" role="tooltip"
                  class="tooltip invisible absolute z-10 inline-block w-72 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xs transition-opacity duration-300 dark:bg-gray-600">
                  Ticket status refers to the current state of a support ticket in various contexts.
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <div>
                <label for="requester"
                  class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Requester</label>
                <div class="relative">
                  <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                    <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="requester"
                    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="e.g. Bonnie Green" />
                </div>
              </div>
              <div>
                <label for="ticket-type"
                  class="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  Type
                  <button data-popover-target="popover-type-description" type="button"
                    class="ms-1 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Show information</span>
                  </button>
                </label>
                <select id="ticket-type"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option selected>Any</option>
                  <option value="personal">Question</option>
                  <option value="business">Refund</option>
                  <option value="business">Service request</option>
                  <option value="business">Task</option>
                </select>
                <div id="popover-type-description" role="tooltip"
                  class="tooltip invisible absolute z-10 inline-block w-72 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xs transition-opacity duration-300 dark:bg-gray-600">
                  Each ticket type represents a specific kind of issue or task that requires attention.
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <div>
                <label for="priority-type"
                  class="mb-2 flex items-center text-sm font-medium text-gray-900 dark:text-white">
                  Priority
                  <button data-popover-target="popover-priority-description" type="button"
                    class="ms-1 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                        clip-rule="evenodd" />
                    </svg>
                    <span class="sr-only">Show information</span>
                  </button>
                </label>
                <select id="priority-type"
                  class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                  <option selected>Any</option>
                  <option value="personal">High</option>
                  <option value="business">Medium</option>
                  <option value="business">Low</option>
                </select>
                <div id="popover-priority-description" role="tooltip"
                  class="tooltip invisible absolute z-10 inline-block w-72 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xs transition-opacity duration-300 dark:bg-gray-600">
                  Ticket priority is a classification that helps determine the importance of a request.
                  <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <div class="mt-6 flex space-x-4">
                <button type="submit"
                  class="w-full rounded-lg bg-primary-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Apply
                </button>
                <button type="reset"
                  class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                  Reset
                </button>
              </div>
            </form>
            <button type="button"
              class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto">
              <svg class="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"
                  d="M9 2.2V7H4.2l.4-.5 3.9-4 .5-.3Zm2-.2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2 0 1.1.9 2 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm1 8.8A2.3 2.3 0 0 0 9.6 13a2.3 2.3 0 0 0 2.1 2.5h.7a.3.3 0 0 1 .2.4l-.4.1h-1a1 1 0 1 0 0 2h1c.5 0 1 0 1.4-.3a2 2 0 0 0 1-1.1 2.3 2.3 0 0 0-2.2-3l-.5-.1a.3.3 0 0 1-.3-.4.3.3 0 0 1 .4-.3h1a1 1 0 1 0 0-2h-1Zm8 1.5a1 1 0 1 0-2-.6l-.5 1.7-.5-1.7a1 1 0 0 0-2 .6l1.5 4.8a1 1 0 0 0 1.9 0l1.6-4.8Zm-13.8.9.4-.2h1a1 1 0 1 0 0-2h-1A2.6 2.6 0 0 0 4 13.6v1.8A2.6 2.6 0 0 0 6.6 18h1a1 1 0 1 0 0-2h-1a.6.6 0 0 1-.6-.6v-1.8c0-.1 0-.3.2-.4Z"
                  clip-rule="evenodd" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
        <div
          class="mb-3 flex w-full shrink-0 flex-col items-stretch justify-end md:mb-0 md:w-auto md:flex-row md:items-center md:space-x-3">
          <button id="createTicketButton" data-modal-target="createTicketModal" data-modal-toggle="createTicketModal"
            type="button"
            class="flex items-center justify-center rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            <svg class="-ms-0.5 me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 12h14m-7 7V5" />
            </svg>
            Create ticket
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap py-4">
      <div class="mr-4 hidden items-center text-sm font-medium text-gray-900 dark:text-white md:flex">Show
        only:</div>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center">
          <input id="inline-radio" type="radio" value="" name="inline-radio-group"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
          <label for="inline-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
        </div>
        <div class="flex items-center">
          <input id="inline-2-radio" type="radio" value="" name="inline-radio-group"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
          <label for="inline-2-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Solved</label>
        </div>
        <div class="flex items-center">
          <input id="inline-3-radio" type="radio" value="" name="inline-radio-group"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
          <label for="inline-3-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pending</label>
        </div>
        <div class="flex items-center">
          <input id="inline-4-radio" type="radio" value="" name="inline-radio-group"
            class="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
          <label for="inline-4-radio" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Archived</label>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto relative">
      <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead class="bg-gray-50 text-xs uppercase text-gray-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all" type="checkbox"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-all" class="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">ID</th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">
              Requested by
              <svg class="ml-1 inline-block h-3 w-3" fill="currentColor" viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
              </svg>
            </th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">Subject</th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">
              Priority
              <svg class="ml-1 inline-block h-3 w-3" fill="currentColor" viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
              </svg>
            </th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">
              Agent
              <svg class="ml-1 inline-block h-3 w-3" fill="currentColor" viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
              </svg>
            </th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">
              Create Date
              <svg class="ml-1 inline-block h-3 w-3" fill="currentColor" viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
              </svg>
            </th>
            <th scope="col" class="whitespace-nowrap px-4 py-3 font-semibold">
              Status
              <svg class="ml-1 inline-block h-3 w-3" fill="currentColor" viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" />
              </svg>
            </th>
            <th scope="col" class="px-4 py-3 font-semibold">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846325</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Mark Duan</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Help with my
              purchase</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-10.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Jese Leos
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">02 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M5.5 3a1 1 0 0 0 0 2H7v2.3c0 .7.2 1.3.6 1.8L9 11.9l.1.1v.1L7.5 15a3 3 0 0 0-.6 1.8V19H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H17v-2.3a3 3 0 0 0-.6-1.8l-1.6-2.8v-.2l1.6-2.8a3 3 0 0 0 .6-1.8V5h1.5a1 1 0 1 0 0-2h-13Z"
                    clip-rule="evenodd" />
                </svg>
                Pending
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-1-dropdown-button" type="button" data-dropdown-toggle="ticket-1-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-1-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-1-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846325</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Donnie Gree</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Support for
              Flowbite</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="me-2 rounded-sm bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">High</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-9.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Neil Simss
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">03 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M5.5 3a1 1 0 0 0 0 2H7v2.3c0 .7.2 1.3.6 1.8L9 11.9l.1.1v.1L7.5 15a3 3 0 0 0-.6 1.8V19H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H17v-2.3a3 3 0 0 0-.6-1.8l-1.6-2.8v-.2l1.6-2.8a3 3 0 0 0 .6-1.8V5h1.5a1 1 0 1 0 0-2h-13Z"
                    clip-rule="evenodd" />
                </svg>
                Pending
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-2-dropdown-button" type="button" data-dropdown-toggle="ticket-2-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-2-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-2-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846325</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">User123</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Verify my email
              and my account</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="me-2 rounded-sm bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">High</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-2.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Roberta Casas
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">03 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M5.5 3a1 1 0 0 0 0 2H7v2.3c0 .7.2 1.3.6 1.8L9 11.9l.1.1v.1L7.5 15a3 3 0 0 0-.6 1.8V19H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H17v-2.3a3 3 0 0 0-.6-1.8l-1.6-2.8v-.2l1.6-2.8a3 3 0 0 0 .6-1.8V5h1.5a1 1 0 1 0 0-2h-13Z"
                    clip-rule="evenodd" />
                </svg>
                Pending
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-3-dropdown-button" type="button" data-dropdown-toggle="ticket-3-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-3-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-3-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846328</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Leslie Livingston</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">New components
            </td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Low</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-2.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Roberta Casas
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">07 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>
                Solved
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-4-dropdown-button" type="button" data-dropdown-toggle="ticket-4-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-4-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-4-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846329</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">User123</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Figma variants
              missing</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="me-2 rounded-sm bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">High</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-10.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Jese Leos
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">07 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M5.5 3a1 1 0 0 0 0 2H7v2.3c0 .7.2 1.3.6 1.8L9 11.9l.1.1v.1L7.5 15a3 3 0 0 0-.6 1.8V19H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H17v-2.3a3 3 0 0 0-.6-1.8l-1.6-2.8v-.2l1.6-2.8a3 3 0 0 0 .6-1.8V5h1.5a1 1 0 1 0 0-2h-13Z"
                    clip-rule="evenodd" />
                </svg>
                Pending
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-5-dropdown-button" type="button" data-dropdown-toggle="ticket-5-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-5-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-5-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846330</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Bergside LLC</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">How to change
              colors</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-2.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Roberta Casas
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">08 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>
                Solved
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-6-dropdown-button" type="button" data-dropdown-toggle="ticket-6-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-6-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-6-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846331</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Faye Drake</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Invoice issues
            </td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Medium</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-10.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Jese Leos
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">08 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>
                Solved
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-7-dropdown-button" type="button" data-dropdown-toggle="ticket-7-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-7-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-7-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846332</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Karen Nelson</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Hello there!
            </td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">High</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-10.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Jese Leos
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">10 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>
                Solved
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-8-dropdown-button" type="button" data-dropdown-toggle="ticket-8-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-8-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-8-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846333</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">Lana Byrd</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Pricing
              questions</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">High</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-7.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Bonnie Green
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">11 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>
                Solved
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-9-dropdown-button" type="button" data-dropdown-toggle="ticket-9-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-9-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-9-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr class="border-b hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 border-gray-200">
            <td class="w-4 px-4 py-3">
              <div class="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" onclick="event.stopPropagation()"
                  class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
              </div>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"><a
                class="hover:underline" href="http://localhost:1313/support/ticket">#1846334</a></th>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-white">User12345</td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">Flowbite license
            </td>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <span
                class="rounded-sm bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Low</span>
            </td>
            <th scope="row" class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">
              <div class="mr-3 flex items-center">
                <img src="http://localhost:1313/images/users/avatar-2.png" alt="Avatar"
                  class="mr-3 h-8 w-auto rounded-full" />
                Roberta Casas
              </div>
            </th>
            <td class="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white">12 Mar 2025</td>
            <td class="whitespace-nowrap px-4 py-3">
              <span
                class="inline-flex items-center rounded-sm bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 0 0-1 1H6a2 2 0 0 0-2 2v15c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2c0-.6-.4-1-1-1H9Zm1 2h4v2h1a1 1 0 1 1 0 2H9a1 1 0 0 1 0-2h1V4Zm5.7 8.7a1 1 0 0 0-1.4-1.4L11 14.6l-1.3-1.3a1 1 0 0 0-1.4 1.4l2 2c.4.4 1 .4 1.4 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>
                Solved
              </span>
            </td>
            <td class="px-4 py-3">
              <button id="ticket-10-dropdown-button" type="button" data-dropdown-toggle="ticket-10-dropdown"
                class="inline-flex items-center rounded-lg p-1 text-center text-sm font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                  viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="4" d="M6 12h0m6 0h0m6 0h0" />
                </svg>
              </button>
              <div id="ticket-10-dropdown"
                class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-sm dark:divide-gray-600 dark:bg-gray-700">
                <ul class="p-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  aria-labelledby="ticket-10-dropdown-button">
                  <li>
                    <a href="#"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m5 12 4.7 4.5 9.3-9" />
                      </svg>
                      Mark as solved
                    </a>
                  </li>
                  <li>
                    <button type="button" id="assigneeTicketModalButton" data-modal-target="assigneeTicketModal"
                      data-modal-toggle="assigneeTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.3-2a6 6 0 0 0 0-6A4 4 0 0 1 20 8a4 4 0 0 1-6.7 3Zm2.2 9a4 4 0 0 0 .5-2v-1a6 6 0 0 0-1.5-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.5Z"
                          clip-rule="evenodd" />
                      </svg>
                      Assignee
                    </button>
                  </li>
                  <li>
                    <button type="button" id="archiveTicketModalButton" data-modal-target="archiveTicketModal"
                      data-modal-toggle="archiveTicketModal"
                      class="inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                      <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                          d="M20 10H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8ZM9 13v-1h6v1c0 .6-.4 1-1 1h-4a1 1 0 0 1-1-1Z"
                          clip-rule="evenodd" />
                        <path d="M2 6c0-1.1.9-2 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2Z" />
                      </svg>
                      Archive
                    </button>
                  </li>
                </ul>
                <div class="p-2">
                  <button type="button" id="deleteInvoiceButton" data-modal-target="deleteTicketModal"
                    data-modal-toggle="deleteTicketModal"
                    class="inline-flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600">
                    <svg class="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                        clip-rule="evenodd" />
                    </svg>
                    Delete ticket
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Table Footer -->
    <div class="relative overflow-hidden">
      <nav
        class="flex flex-col items-start justify-between space-y-3 pt-4 md:flex-row md:items-center md:space-y-0 md:pt-6"
        aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span
            class="font-semibold text-gray-900 dark:text-white">1-15</span> of <span
            class="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a href="#"
              class="ml-0 flex h-full items-center justify-center rounded-l-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Previous</span>
              <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m15 19-7-7 7-7" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              1
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              2
            </a>
          </li>
          <li>
            <a href="#" aria-current="page"
              class="z-10 flex items-center justify-center border border-primary-300 bg-primary-50 px-3 py-2 text-sm leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
              3
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              ...
            </a>
          </li>
          <li>
            <a href="#"
              class="flex items-center justify-center border border-gray-300 bg-white px-3 py-2 text-sm leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              100
            </a>
          </li>
          <li>
            <a href="#"
              class="flex h-full items-center justify-center rounded-r-lg border border-gray-300 bg-white px-3 py-1.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span class="sr-only">Next</span>
              <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m9 5 7 7-7 7" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
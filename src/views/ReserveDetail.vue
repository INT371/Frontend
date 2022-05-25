<template>
<!-- component -->
<nav-bar></nav-bar>

<section v-if="reserveDetail!= null" class="py-20 bg-indigo-500">
 <div class="max-w-5xl mx-auto py-16 bg-white rounded-lg  border-2">
  <article class="overflow-hidden">
   <div class="bg-[white] rounded-b-md">
    <div class="p-9">
     <div class="space-y-6 text-slate-700">
    
      <p class="text-xl font-extrabold tracking-tight uppercase font-body">
          {{ reserveDetail.user.username}}
</p>
     </div>
    </div>

    <div class="p-9">
     <div class="flex w-full">
      <div class="grid grid-cols-4 gap-12">
       <div class="text-sm font-light text-slate-500">
        <p class="text-sm font-normal text-slate-700">
         Room Detail:
        </p>
        <p>Room Name :{{ reserveDetail.room.room_name}}</p>
        <p>Room Description :{{ reserveDetail.room.room_type.description}}</p>
        <p>Room Policy :{{ reserveDetail.room.room_type.price}}</p>
        <p>Room Capacity :{{reserveDetail.room_type.max_capacity}}</p>
       </div>

       <div class="text-sm font-light text-slate-500">
        <p class="text-sm font-normal text-slate-700">User Infomation</p>
        <p>Tel Number :{{ reserveDetail.user.tel_no}}</p>
        <p>Email :{{ reserveDetail.user.email}}</p>
        <p>First Name :{{ reserveDetail.user.first_name}}</p>
        <p>Last Name :{{ reserveDetail.user.last_name}}</p>
       </div>
       <div class="text-sm font-light text-slate-500">
        <p class="text-sm font-normal text-slate-700">User Status</p>
        <p>{{ reserveDetail.status}}</p>
       </div>
       <div class="text-sm font-light text-slate-500">
        <p class="text-sm font-normal text-slate-700">Check-In Date</p>
        <p>{{reserveDetail.check_in_date}}</p>

        <p class="mt-2 text-sm font-normal text-slate-700">Check-Out Date</p>
        <p>{{reserveDetail.check_out_date}}</p>
       </div>
      </div>
     </div>
    </div>

    <div class="p-9">
     <div class="flex flex-col mx-0 mt-8">
      <table class="min-w-full divide-y divide-slate-500">
       <thead>
        <tr>
         <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
          Description
         </th>
         <th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          Quantity
         </th>
         <th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
          Rate
         </th>
         <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
          Amount
         </th>
        </tr>
       </thead>

       <!-- <tbody>
        <tr class="border-b border-slate-200">
         <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
          <div class="font-medium text-slate-700">{{reserveDetail.room.room_name}}</div>
        
         </td>
         <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          48
         </td>
         <td class="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
          $0.00
         </td>
         <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr>
       </tbody>
       <tfoot>
        <tr>
         <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Subtotal
         </th>
         <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Subtotal
         </th>
         <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr>
        <tr>
         <th scope="row" colspan="3" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Discount
         </th>
         <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Discount
         </th>
         <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr>
        <tr>
         <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
          Tax
         </th>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
          Tax
         </th>
         <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr>
        <tr>
         <th scope="row" colspan="3" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
          Total
         </th>
         <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
          Total
         </th>
         <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
          $0.00
         </td>
        </tr>
       </tfoot> -->
       
      </table>
     </div>
    </div>

    
   </div>
  </article>
 </div>
</section>

</template>
<script>

import { computed } from "@vue/reactivity";
import { useStore } from 'vuex'

export default{
    setup() {
    const store = useStore();
    return {
     reserveDetail : computed(() => store.state.reserveDetail)
    }
  }
}
</script>
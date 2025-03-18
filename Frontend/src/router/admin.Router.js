import sach from "@/views/Sach.vue";
import docgia from "@/views/Docgia.vue";
import nhanvien from "@/views/NhanVien.vue";
import theodoimuonsach from "@/views/TheoDoiMuonSach.vue";
import nxb from "@/views/NXB.vue";

export default [
  {
    path: "/admin/",
    name: "sach",
    component: sach,
  },
  {
    path: "/admin/reader",
    name: "docgia",
    component: docgia,
  },
  {
    path: "/admin/nxb",
    name: "nxb",
    component: nxb,
  },
  {
    path: "/admin/nhanvien",
    name: "nhanvien",
    component: nhanvien,
  },
  {
    path: "/admin/theodoimuonsach",
    name: "theodoimuonsach",
    component: theodoimuonsach,
  },
];

const Home = {
  text: "Home",
  link: "/home",
  icon: "icon-home"
};
const test = {
  text: "Test",
  link: "/test",
  icon: "icon-home"
};
const HomeAgronodo = {
    text: "Home Agronodo",
    link: "/home-agronodo",
    icon: "icon-home"
  };
const UsuariosAgroindustriasAgronodo = {
  text: "Usuarios",
  submenu: [
    {
      text: "Administrador-Agro",
      link: "/Admin-Agronodo",
      icon: "icon-user"
    },
    {
      text: "Agroindustrias-Agro",
      link: "/Agroindustrias-Agronodo",
      icon: "fas fa-industry"
    }
  ]
};

const headingMain = {
  text: "Main Navigation",
  heading: true
};

export const menu = [headingMain, Home, HomeAgronodo, UsuariosAgroindustriasAgronodo];

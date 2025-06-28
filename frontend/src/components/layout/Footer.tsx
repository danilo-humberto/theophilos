const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-2 text-muted-foreground text-sm">
      &copy; {new Date().getFullYear()} Theophilos. Todos os direitos
      reservados.
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="flex items-center justify-center p-2 text-muted-foreground text-[12px] fixed bottom-0 w-full">
      &copy; {new Date().getFullYear()} Theophilos. Todos os direitos
      reservados.
    </footer>
  );
};

export default Footer;

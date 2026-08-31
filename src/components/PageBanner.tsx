type PageBannerProps = {
  title: string;
  subtitle: string;
  image: string;
};

export default function PageBanner({ title, subtitle, image }: PageBannerProps) {
  return (
    <div
      className="relative py-24 overflow-hidden max-w-7xl mx-auto w-full"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-orange-600/75" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-white/90 text-lg max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </div>
  );
}

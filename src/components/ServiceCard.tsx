type ServiceCardProps = {
  title: string;
  description: string;
  icon?: string;
};

export default function ServiceCard({
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <div className="group border border-cream-dark p-8 hover:border-gold transition-colors duration-300 bg-white">
      {icon && (
        <span className="block text-gold text-2xl mb-4">{icon}</span>
      )}
      <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-olive transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-charcoal-light">{description}</p>
    </div>
  );
}

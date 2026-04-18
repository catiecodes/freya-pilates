export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  sort_order: number;
  created_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  inquiry_type: string;
  message: string;
  created_at: string;
};

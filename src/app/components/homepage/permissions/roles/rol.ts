
export interface Permission {
  name: string;
  content_type: {
    app_label: string;
    model: string;
  };
  codename: string;
}

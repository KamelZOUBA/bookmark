export class Bookmark {
  public idBookmark: number;
  public nom: string;
  public url: string;
  public comment: string;

  constructor(idBookmark, nom, url, comment) {
    this.idBookmark = idBookmark;
    this.nom = nom;
    this.url = url;
    this.comment = comment;
  }

}

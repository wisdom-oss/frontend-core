export default interface schema {
  user: {
    pk: number,
    username: string,
    name: string,
    is_active: boolean,
    is_superuser: boolean,
    groups: {
      name: string,
      pk: string
    }[],
    email: string,
    avatar: string,
    uid: string,
    settings: Record<any, any>
  }
}

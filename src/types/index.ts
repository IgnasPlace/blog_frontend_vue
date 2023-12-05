export type Post = {
  id: number
  title: string
  body: string
  created_on: string
  updated_on?: string
  user_name: string
  user_id: string
}
export type NewPost = {
  title: string
  body: string
  createdAt: string
}
export type User = {
  name: string
  picture: string
  email: string
  id: string
}

export type PostsState = Post[]

export type CurrentUser = User | null

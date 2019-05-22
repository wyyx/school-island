import { httpService } from './http.service'
import { Article, ArticlePostData } from '@/models/article.model'

export class ArticleService {
  httpService = httpService

  getArticleList(params: { schoolId: string; current: number; size: number }) {
    return this.httpService.post('/w/article/list', null, { data: params })
  }

  getArticle(id: string) {
    return this.httpService.post<Article>('/w/article/details', null, {
      data: {
        id
      }
    })
  }

  addArticle(article: ArticlePostData) {
    return this.httpService.post('/w/article/add', null, {
      data: article
    })
  }

  setTop(id: string) {
    return this.httpService.post('/w/article/priority', null, {
      data: { id }
    })
  }
}

export const articles = [
  {
    id: 1,
    context: '文章内容 aaa',
    description: '文章描述 aaa',
    title: '文章标题 aaa'
  },
  {
    id: 2,
    context: '文章内容 bbb',
    description: '文章描述 bbb',
    title: '文章标题 bbb'
  },
  {
    id: 3,
    context: '文章内容 ccc',
    description: '文章描述 ccc',
    title: '文章标题 ccc'
  },
  {
    id: 4,
    context: '文章内容 ddd',
    description: '文章描述 ddd',
    title: '文章标题 ddd'
  },
  {
    id: 5,
    context: '文章内容 eee',
    description: '文章描述 eee',
    title: '文章标题 eee'
  }
]

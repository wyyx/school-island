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
    context: `<p>文章内容 aaa 美国彭博社22日消息称，美国政府正考虑将5家中国监控设备企业列入与华为类似的“黑名单”，禁止他们获得美国零件与软件，其中包括海康威视与浙江大华。此前，《纽约时报》曾报道说海康威视会被列入黑名单，后者今早已公开做出回应。</p>

    <p>彭博社的消息源为“熟悉相关情况人士”，这些所谓的人士说，特朗普政府在考虑给5家中国监控设备企业“断供”，其中包括海康威视和浙江大华技术股份有限公司，另外3家企业是谁并未指明。该人士称，美国政府正在考虑是否禁止这些中国企业得到美国零件与软件。</p>
    
    <p>今天早些时候，《纽约时报》报道称，美政府将考虑将海康威视列入黑名单，限制其购买美国技术。海康威视22日上午向《环球时报》进行回复称，“我们已关注到《纽约时报》今早的报道，期望公司得到公平、公正的对待。”针对外媒曾指责海康威视设备用于新疆对穆斯林进行大规模监视的报道，海康威视回应称，海康威视是一家产品供应商，未在新疆做过任何不恰当的行为，公司过去不曾、现在和将来也不会以侵犯人权为条件的业务作为公司业务进行经营。</p>`,
    description: '文章描述 aaa',
    title: '文章标题 aaa'
  },
  {
    id: 2,
    context: `文章内容 bbb 海康威视全称杭州海康威视数字技术股份有限公司，其2018年年报显示，海康威视是以视频为核心的智能物联网解决方案和大数据服务提供商，

    根据IHS报告，海康威视连续7年蝉联视频监控行业全球第一，拥有全球视频监控市场份额的22.6%。`,
    description: '文章描述 bbb',
    title: '文章标题 bbb'
  },
  {
    id: 3,
    context: `文章内容 ccc 2018年8月13日，腾讯WeGame平台公告称《怪物猎人：世界》由于部分内容未符合政策法规而被有关机构取消运营资质，应主管部门要求下架整改，停止发售。

    2018年8月16日，国家监管机构出于对游戏暴力内容与赌博问题的担忧，而暂时冻结了网络游戏的版号审批。受两款作品影响，截止10月30日腾讯香港联交所股价从每股港币475.6元指数级下挫至252.14元。`,
    description: '文章描述 ccc',
    title: '文章标题 ccc'
  },
  {
    id: 4,
    context: `文章内容 ddd 上个月，诺基亚公布了2019年一季度财报：营业亏损达5.85亿美元，亏损同比扩大56%；归属于母公司股东的净亏损（归母净亏损）更是同比扩大了137%。

    对此，诺基亚在财报中坦言，该公司今年下半年将承受“巨大的压力”。而彭博社直接评价，随着5G设备供应商之争进入白热化，诺基亚等同于“首战告负”。还有使用了诺基亚设备的韩国电信商内部人士吐槽，诺基亚的5G设备交货不仅跳票，且设备性能不如对手。`,
    description: '文章描述 ddd',
    title: '文章标题 ddd'
  },
  {
    id: 5,
    context: `文章内容 eee 造车这件事其实挺难的，从两眼一抹黑到投产上市，经历的每一天都是心惊胆战，不过就算造车艰难，还是有众多创业者投身其中，其中不乏李想、李斌、许家印这些早已在商界留下赫赫威名的大佬们，然而这些大佬当下就算做得再好，也比上挡在他们前方的一道身影——特斯拉。

    2013年，特斯拉凭借量产型轿跑Model S让世界认识到了电动汽车，加上创始人高调宣传的环保节能理念，几年内成功收获了一波又一波粉丝，并引领者后来者开启电气化汽车新时代。`,
    description: '文章描述 eee',
    title: '文章标题 eee'
  }
]

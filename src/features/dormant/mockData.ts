const GMAIL = 'jihye.kim@gmail.com'
const NAVER = 'jihye@naver.com'

export type DormantAccount = {
  id: string
  name: string
  initial: string
  mailbox: string
  lastLogin: string
  note?: string
  agentSupported: boolean
  recommended: boolean
}

// TODO: 비활성 계정 API 연동 후 제거
export const dormantAccountsMock: DormantAccount[] = [
  {
    id: 'yanolja',
    name: '야놀자',
    initial: 'Y',
    mailbox: NAVER,
    lastLogin: '2023.05.18',
    note: '휴면 전환 예정',
    agentSupported: true,
    recommended: true,
  },
  {
    id: '29cm',
    name: '29CM',
    initial: '2',
    mailbox: GMAIL,
    lastLogin: '2024.03.02',
    agentSupported: true,
    recommended: true,
  },
  {
    id: 'wemakeprice',
    name: '위메프',
    initial: 'W',
    mailbox: NAVER,
    lastLogin: '2023.09.07',
    agentSupported: true,
    recommended: true,
  },
  {
    id: 'musinsa',
    name: '무신사',
    initial: 'M',
    mailbox: GMAIL,
    lastLogin: '2023.11.20',
    agentSupported: false,
    recommended: false,
  },
  {
    id: 'cyworld',
    name: '싸이월드',
    initial: 'S',
    mailbox: NAVER,
    lastLogin: '2020.07.13',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'interpark',
    name: '인터파크',
    initial: 'I',
    mailbox: GMAIL,
    lastLogin: '2022.12.03',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'tmon',
    name: '티몬',
    initial: 'T',
    mailbox: NAVER,
    lastLogin: '2023.02.14',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'auction',
    name: '옥션',
    initial: 'A',
    mailbox: GMAIL,
    lastLogin: '2021.08.29',
    agentSupported: true,
    recommended: false,
  },
  {
    id: '11st',
    name: '11번가',
    initial: '1',
    mailbox: NAVER,
    lastLogin: '2023.06.30',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'watcha',
    name: '왓챠',
    initial: 'W',
    mailbox: GMAIL,
    lastLogin: '2022.04.11',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'melon',
    name: '멜론',
    initial: 'M',
    mailbox: NAVER,
    lastLogin: '2021.10.02',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'bugs',
    name: '벅스',
    initial: 'B',
    mailbox: GMAIL,
    lastLogin: '2020.11.25',
    agentSupported: false,
    recommended: false,
  },
  {
    id: 'aladin',
    name: '알라딘',
    initial: 'A',
    mailbox: GMAIL,
    lastLogin: '2023.01.09',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'yes24',
    name: '예스24',
    initial: 'Y',
    mailbox: NAVER,
    lastLogin: '2022.07.17',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'kurly',
    name: '마켓컬리',
    initial: 'K',
    mailbox: GMAIL,
    lastLogin: '2023.08.05',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'oliveyoung',
    name: '올리브영',
    initial: 'O',
    mailbox: NAVER,
    lastLogin: '2022.09.21',
    agentSupported: true,
    recommended: false,
  },
  {
    id: 'zigbang',
    name: '직방',
    initial: 'Z',
    mailbox: GMAIL,
    lastLogin: '2021.05.03',
    agentSupported: true,
    recommended: false,
  },
]

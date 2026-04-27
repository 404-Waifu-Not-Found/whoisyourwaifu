import type { Axis, Character, WaifuType } from '@/types'

const typeOrder: Axis[] = ['E_I', 'S_N', 'T_F', 'J_P']
const portraitSource = 'MyAnimeList'
const sourceTranslations: Record<string, string> = {
  'Kaguya-sama: Love Is War': '辉夜大小姐想让我告白',
  'My Teen Romantic Comedy SNAFU': '我的青春恋爱物语果然有问题',
  'Frieren: Beyond Journey’s End': '葬送的芙莉莲',
  'Steins;Gate': '命运石之门',
  'Fate/stay night': 'Fate/stay night',
  'Chainsaw Man': '电锯人',
  'Spice and Wolf': '狼与香辛料',
  KonoSuba: '为美好的世界献上祝福！',
  'Violet Evergarden': '紫罗兰永恒花园',
  'Puella Magi Madoka Magica': '魔法少女小圆',
  'The Quintessential Quintuplets': '五等分的新娘',
  'Love, Chunibyo & Other Delusions': '中二病也要谈恋爱！',
  'Sword Art Online': '刀剑神域',
  'Demon Slayer': '鬼灭之刃',
  'My Dress-Up Darling': '更衣人偶坠入爱河',
  'Attack on Titan': '进击的巨人',
  'Re:Zero': 'Re:从零开始的异世界生活',
  'Spy x Family': '间谍过家家',
  'A Certain Scientific Railgun': '某科学的超电磁炮',
  'Fairy Tail': '妖精的尾巴',
  'Fruits Basket': '水果篮子',
  'Fullmetal Alchemist': '钢之炼金术师',
  'Black Lagoon': '黑礁',
  'Jujutsu Kaisen': '咒术回战',
  'Darling in the Franxx': 'DARLING in the FRANXX',
  'A Silent Voice': '声之形',
  Bleach: '死神',
  'Akame ga Kill!': '斩！赤红之瞳',
  'The Melancholy of Haruhi Suzumiya': '凉宫春日的忧郁',
  'Kill la Kill': '斩服少女',
  'Bocchi the Rock!': '孤独摇滚！',
  'K-On!': '轻音少女',
  Naruto: '火影忍者',
  "Miss Kobayashi's Dragon Maid": '小林家的龙女仆',
  'Ghost in the Shell': '攻壳机动队',
  'Death Note': '死亡笔记',
}

const portraits: Record<string, NonNullable<Character['portrait']>> = {
  'kaguya-shinomiya': {
    url: 'https://myanimelist.net/images/characters/2/504723.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/136359/Kaguya_Shinomiya',
  },
  'yukino-yukinoshita': {
    url: 'https://myanimelist.net/images/characters/4/202721.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/67067/Yukino_Yukinoshita',
  },
  frieren: {
    url: 'https://myanimelist.net/images/characters/7/525105.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/184947/Frieren',
  },
  'kurisu-makise': {
    url: 'https://myanimelist.net/images/characters/12/492885.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/34470/Kurisu_Makise',
  },
  'rin-tohsaka': {
    url: 'https://myanimelist.net/images/characters/2/270529.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/498/Rin_Toosaka',
  },
  makima: {
    url: 'https://myanimelist.net/images/characters/4/489561.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/170734/Makima',
  },
  holo: {
    url: 'https://myanimelist.net/images/characters/15/319492.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/7373/Holo',
  },
  megumin: {
    url: 'https://myanimelist.net/images/characters/14/349249.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/117225/Megumin',
  },
  'violet-evergarden': {
    url: 'https://myanimelist.net/images/characters/9/345616.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/141354/Violet_Evergarden',
  },
  'homura-akemi': {
    url: 'https://myanimelist.net/images/characters/16/526748.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/38005/Homura_Akemi',
  },
  'miku-nakano': {
    url: 'https://myanimelist.net/images/characters/15/507743.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/160603/Miku_Nakano',
  },
  'rikka-takanashi': {
    url: 'https://myanimelist.net/images/characters/2/257273.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/65865/Rikka_Takanashi',
  },
  'asuna-yuuki': {
    url: 'https://myanimelist.net/images/characters/15/262053.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/36828/Asuna_Yuuki',
  },
  'mitsuri-kanroji': {
    url: 'https://myanimelist.net/images/characters/11/514229.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/151145/Mitsuri_Kanroji',
  },
  'chika-fujiwara': {
    url: 'https://myanimelist.net/images/characters/15/559031.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/140810/Chika_Fujiwara',
  },
  'marin-kitagawa': {
    url: 'https://myanimelist.net/images/characters/3/514695.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/166439/Marin_Kitagawa',
  },
  saber: {
    url: 'https://myanimelist.net/images/characters/6/275276.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/497/Saber',
  },
  'mikasa-ackerman': {
    url: 'https://myanimelist.net/images/characters/9/215563.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/40881/Mikasa_Ackerman',
  },
  rem: {
    url: 'https://myanimelist.net/images/characters/9/311327.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/118763/Rem',
  },
  'yor-forger': {
    url: 'https://myanimelist.net/images/characters/11/457934.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/170329/Yor_Forger',
  },
  'misaka-mikoto': {
    url: 'https://myanimelist.net/images/characters/16/569611.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/13701/Mikoto_Misaka',
  },
  'erza-scarlet': {
    url: 'https://myanimelist.net/images/characters/12/492254.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/5189/Erza_Scarlet',
  },
  'tohru-honda': {
    url: 'https://myanimelist.net/images/characters/2/384113.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/207/Tooru_Honda',
  },
  'winry-rockbell': {
    url: 'https://myanimelist.net/images/characters/15/84336.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/63/Winry_Rockbell',
  },
  revy: {
    url: 'https://myanimelist.net/images/characters/10/78871.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/458/Revy',
  },
  'maki-zenin': {
    url: 'https://myanimelist.net/images/characters/15/423949.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/164482/Maki_Zenin',
  },
  'zero-two': {
    url: 'https://myanimelist.net/images/characters/14/559013.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/155679/Zero_Two',
  },
  'shoko-nishimiya': {
    url: 'https://myanimelist.net/images/characters/5/302315.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/80243/Shouko_Nishimiya',
  },
  power: {
    url: 'https://myanimelist.net/images/characters/7/494969.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/170733/Power',
  },
  'yoruichi-shihouin': {
    url: 'https://myanimelist.net/images/characters/14/536084.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/908/Yoruichi_Shihouin',
  },
  aqua: {
    url: 'https://myanimelist.net/images/characters/7/325600.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/148554/Aqua',
  },
  'nino-nakano': {
    url: 'https://myanimelist.net/images/characters/7/437011.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/161472/Nino_Nakano',
  },
  esdeath: {
    url: 'https://myanimelist.net/images/characters/12/265641.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/65239/Esdeath',
  },
  'yuki-nagato': {
    url: 'https://myanimelist.net/images/characters/11/319309.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/249/Yuki_Nagato',
  },
  'satsuki-kiryuin': {
    url: 'https://myanimelist.net/images/characters/7/219863.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/83799/Satsuki_Kiryuuin',
  },
  'haruhi-suzumiya': {
    url: 'https://myanimelist.net/images/characters/13/284136.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/251/Haruhi_Suzumiya',
  },
  'shinobu-kocho': {
    url: 'https://myanimelist.net/images/characters/3/386591.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/146736/Shinobu_Kochou',
  },
  'hitori-gotou': {
    url: 'https://myanimelist.net/images/characters/8/491455.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/206276/Hitori_Gotou',
  },
  emilia: {
    url: 'https://myanimelist.net/images/characters/16/551926.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/118737/Emilia',
  },
  'yui-hirasawa': {
    url: 'https://myanimelist.net/images/characters/6/326131.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/19565/Yui_Hirasawa',
  },
  'riza-hawkeye': {
    url: 'https://myanimelist.net/images/characters/3/451785.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/70/Riza_Hawkeye',
  },
  'hinata-hyuuga': {
    url: 'https://myanimelist.net/images/characters/6/278736.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/1555/Hinata_Hyuuga',
  },
  'olivier-armstrong': {
    url: 'https://myanimelist.net/images/characters/7/83953.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/3934/Olivier_Mira_Armstrong',
  },
  'tohru-dragon': {
    url: 'https://myanimelist.net/images/characters/11/322676.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/136727/Tooru',
  },
  'motoko-kusanagi': {
    url: 'https://myanimelist.net/images/characters/2/314931.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/1795/Motoko_Kusanagi',
  },
  'nezuko-kamado': {
    url: 'https://myanimelist.net/images/characters/2/378254.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/146157/Nezuko_Kamado',
  },
  'ryuko-matoi': {
    url: 'https://myanimelist.net/images/characters/5/454530.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/83797/Ryuuko_Matoi',
  },
  'misa-amane': {
    url: 'https://myanimelist.net/images/characters/5/30971.jpg',
    sourceName: portraitSource,
    sourceUrl: 'https://myanimelist.net/character/835/Misa_Amane',
  },
}

function vectorFromType(type: WaifuType, intensity = 72): Record<Axis, number> {
  const letters = type.split('')
  return {
    E_I: letters[0] === 'I' ? intensity : -intensity,
    S_N: letters[1] === 'N' ? intensity : -intensity,
    T_F: letters[2] === 'F' ? intensity : -intensity,
    J_P: letters[3] === 'P' ? intensity : -intensity,
  }
}

function character(
  id: string,
  name: string,
  zhName: string,
  source: string,
  type: WaifuType,
  traits: [string, string, string],
  zhTraits: [string, string, string],
  matchCopy: string,
  zhCopy: string,
  palette: string,
  intensity = 72,
): Character {
  const axisVector = vectorFromType(type, intensity)
  const axisToNudge = typeOrder[id.length % typeOrder.length]
  axisVector[axisToNudge] = Math.max(-92, Math.min(92, axisVector[axisToNudge] + Math.sign(axisVector[axisToNudge]) * 10))

  return {
    id,
    name: { en: name, zh: zhName },
    source: { en: source, zh: sourceTranslations[source] ?? source },
    type,
    portrait: portraits[id],
    axisVector,
    traits: { en: traits, zh: zhTraits },
    matchCopy: { en: matchCopy, zh: zhCopy },
    palette,
  }
}

const starterCharacters: Character[] = [
  character('kaguya-shinomiya', 'Kaguya Shinomiya', '四宫辉夜', 'Kaguya-sama: Love Is War', 'INTJ', ['Strategic', 'Proud', 'Secretly soft'], ['高智商', '傲娇', '暗藏柔软'], 'Your ideal route is a chess match where every move is flirting and nobody admits it first.', '你的理想路线是一场恋爱棋局：每一步都在调情，但谁也不先承认。', 'rose'),
  character('yukino-yukinoshita', 'Yukino Yukinoshita', '雪之下雪乃', 'My Teen Romantic Comedy SNAFU', 'INTJ', ['Precise', 'Principled', 'Hard to impress'], ['精准', '有原则', '很难攻略'], 'You like elegance with edges, the kind that critiques your life and somehow improves it.', '你喜欢带锋芒的优雅：她会吐槽你的人生，然后真的让它变好。', 'ice', 65),
  character('frieren', 'Frieren', '芙莉莲', 'Frieren: Beyond Journey’s End', 'INTP', ['Ancient calm', 'Curious', 'Deadpan'], ['古老淡定', '好奇', '冷面吐槽'], 'Your heart wants quiet mystery, tiny expressions, and feelings that arrive three episodes later.', '你的心想要安静的神秘感、小表情，以及三集之后才补上的情绪回响。', 'mint'),
  character('kurisu-makise', 'Kurisu Makise', '牧濑红莉栖', 'Steins;Gate', 'INTP', ['Brilliant', 'Tsundere', 'Analytical'], ['天才', '傲娇', '分析型'], 'You are extremely vulnerable to lab-coat logic, sharp banter, and badly hidden affection.', '你对实验服逻辑、犀利互怼和藏不住的好感毫无防御。', 'copper', 66),
  character('rin-tohsaka', 'Rin Tohsaka', '远坂凛', 'Fate/stay night', 'ENTJ', ['Commanding', 'Capable', 'Competitive'], ['强势', '能干', '好胜'], 'You want a high-spec partner who plans the route, wins the fight, and still calls you hopeless.', '你想要高规格搭档：会规划路线、赢下战斗，还顺便说你没救了。', 'ruby'),
  character('makima', 'Makima', '玛奇玛', 'Chainsaw Man', 'ENTJ', ['Magnetic', 'Calculating', 'Dangerous'], ['磁场强', '算计深', '危险'], 'Your taste has entered the red-flag district and rented a penthouse.', '你的XP已经搬进红旗区顶层公寓了。', 'crimson', 68),
  character('holo', 'Holo', '赫萝', 'Spice and Wolf', 'ENTP', ['Witty', 'Worldly', 'Playful'], ['机智', '见多识广', '会撩'], 'You want banter with lore, business sense, and a smile that clearly knows too much.', '你想要带设定的互怼、会算账的聪明，以及明显知道太多的笑容。', 'amber'),
  character('megumin', 'Megumin', '惠惠', 'KonoSuba', 'ENTP', ['Dramatic', 'Explosive', 'Single-minded'], ['戏剧化', '爆裂', '执念强'], 'You respect commitment to the bit, especially when the bit leaves a smoking crater.', '你尊重把梗贯彻到底的人，尤其是这个梗会炸出坑的时候。', 'violet', 65),
  character('violet-evergarden', 'Violet Evergarden', '薇尔莉特', 'Violet Evergarden', 'INFJ', ['Graceful', 'Devoted', 'Searching'], ['优雅', '专注', '追寻意义'], 'You are drawn to quiet devotion, emotional depth, and the kind of beauty that ruins your posture.', '你会被安静的执着、深层情感，以及让人坐不直的美击中。', 'lavender'),
  character('homura-akemi', 'Homura Akemi', '晓美焰', 'Puella Magi Madoka Magica', 'INFJ', ['Intense', 'Loyal', 'Tragic'], ['强烈', '忠诚', '宿命感'], 'You want devotion so powerful it starts arguing with the timeline.', '你想要强到能和时间线吵架的执着。', 'midnight', 69),
  character('miku-nakano', 'Miku Nakano', '中野三玖', 'The Quintessential Quintuplets', 'INFP', ['Shy', 'Earnest', 'History buff'], ['害羞', '真诚', '历史厨'], 'Your ideal match is soft-spoken sincerity with a surprisingly strong inner campaign.', '你的理想匹配是轻声的真诚，以及意外坚定的内心战役。', 'aqua'),
  character('rikka-takanashi', 'Rikka Takanashi', '小鸟游六花', 'Love, Chunibyo & Other Delusions', 'INFP', ['Imaginative', 'Tender', 'Dramatic'], ['想象力强', '柔软', '戏很多'], 'You want feelings wrapped in fantasy terminology and delivered with full commitment.', '你想要用幻想术语包装、并且全力演出的感情。', 'indigo', 65),
  character('asuna-yuuki', 'Asuna Yuuki', '结城明日奈', 'Sword Art Online', 'ENFJ', ['Brave', 'Supportive', 'Decisive'], ['勇敢', '可靠', '果断'], 'You want a partner who can lead the raid, heal the mood, and still make dinner feel canon.', '你想要能带队攻略、修复气氛，还能把晚饭做成正史的人。', 'peach'),
  character('mitsuri-kanroji', 'Mitsuri Kanroji', '甘露寺蜜璃', 'Demon Slayer', 'ENFJ', ['Warm', 'Strong', 'Expressive'], ['温暖', '强大', '表达直接'], 'Your heart wants maximum affection backed by terrifying combat stats.', '你的心想要满格爱意，并且战斗数值高到离谱。', 'sakura', 66),
  character('chika-fujiwara', 'Chika Fujiwara', '藤原千花', 'Kaguya-sama: Love Is War', 'ENFP', ['Chaotic', 'Cheerful', 'Unpredictable'], ['混沌', '快乐', '不可预测'], 'You want sunshine with a smoke machine and absolutely no respect for the script.', '你想要自带烟雾机的阳光，并且完全不尊重剧本。', 'bubblegum'),
  character('marin-kitagawa', 'Marin Kitagawa', '喜多川海梦', 'My Dress-Up Darling', 'ENFP', ['Open-hearted', 'Bold', 'Joyful'], ['坦率', '大胆', '快乐'], 'You are weak to open enthusiasm, big feelings, and someone who makes liking things look heroic.', '你扛不住坦率热情、大份情绪，以及把“喜欢”活成英雄行为的人。', 'sunset', 68),
  character('saber', 'Saber', '阿尔托莉雅', 'Fate/stay night', 'ISTJ', ['Honorable', 'Disciplined', 'Steadfast'], ['荣誉感', '自律', '坚定'], 'You want knightly reliability, clear vows, and emotional restraint with legendary damage.', '你想要骑士级可靠、承诺清晰，以及传说级伤害的情感克制。', 'royal'),
  character('mikasa-ackerman', 'Mikasa Ackerman', '三笠·阿克曼', 'Attack on Titan', 'ISTJ', ['Protective', 'Focused', 'Unshakable'], ['保护欲', '专注', '稳如山'], 'Your type is quiet loyalty with enough combat pressure to end the argument.', '你的类型是安静忠诚，并且战斗压迫感足够终结争论。', 'steel', 70),
  character('rem', 'Rem', '蕾姆', 'Re:Zero', 'ISFJ', ['Devoted', 'Gentle', 'Resilient'], ['专情', '温柔', '坚韧'], 'You want devotion that remembers the tiny things and still shows up for the boss fight.', '你想要记得所有小事、还会出现在Boss战里的专情。', 'sky'),
  character('yor-forger', 'Yor Forger', '约尔·福杰', 'Spy x Family', 'ISFJ', ['Sweet', 'Protective', 'Deadly'], ['甜', '护短', '致命'], 'Your ideal comfort character can make dinner, panic adorably, and delete threats off-screen.', '你的理想安心角色会做饭、可爱地慌张，并且在画面外清理威胁。', 'wine', 67),
  character('misaka-mikoto', 'Misaka Mikoto', '御坂美琴', 'A Certain Scientific Railgun', 'ESTJ', ['Direct', 'Energetic', 'Principled'], ['直接', '有冲劲', '讲原则'], 'You like straightforward sparks, high standards, and someone who turns justice into voltage.', '你喜欢直球火花、高标准，以及把正义打成电压的人。', 'electric'),
  character('erza-scarlet', 'Erza Scarlet', '艾露莎', 'Fairy Tail', 'ESTJ', ['Strict', 'Fearless', 'Loyal'], ['严格', '无畏', '重情义'], 'You want authority, armor changes, and the kind of loyalty that terrifies the room.', '你想要权威感、换装战斗，以及能震慑全场的情义。', 'scarlet', 69),
  character('tohru-honda', 'Tohru Honda', '本田透', 'Fruits Basket', 'ESFJ', ['Kind', 'Patient', 'Healing'], ['善良', '耐心', '治愈'], 'Your result says you are defenseless against kindness with industrial-grade emotional repair power.', '结果显示，你对工业级情绪修复力的善良完全没有防御。', 'honey'),
  character('winry-rockbell', 'Winry Rockbell', '温莉·洛克贝尔', 'Fullmetal Alchemist', 'ESFJ', ['Practical', 'Caring', 'Fiery'], ['实干', '会照顾人', '火力足'], 'You want care that comes with tools, scolding, and a repair bill you somehow deserve.', '你想要带工具、带数落、还带一张你大概活该的维修账单的关心。', 'brass', 66),
  character('revy', 'Revy', '莱薇', 'Black Lagoon', 'ISTP', ['Ruthless', 'Cool', 'Volatile'], ['狠', '冷', '不稳定'], 'Your taste likes danger served dry, loud, and several legal categories away from normal.', '你的口味喜欢干脆、吵闹、并且离正常生活隔着好几个法律分类的危险。', 'gunmetal'),
  character('maki-zenin', 'Maki Zenin', '禅院真希', 'Jujutsu Kaisen', 'ISTP', ['Tough', 'Independent', 'Blunt'], ['硬核', '独立', '直白'], 'You respect raw competence, blunt honesty, and someone who does not need permission to be iconic.', '你尊重硬实力、直白诚实，以及不需要许可就能成名场面的人。', 'forest', 68),
  character('zero-two', 'Zero Two', '零二', 'Darling in the Franxx', 'ISFP', ['Wild', 'Romantic', 'Haunting'], ['野性', '浪漫', '有余韵'], 'Your ideal route is dangerous romance with a grin, a nickname, and a lot of symbolism.', '你的理想路线是危险浪漫：一个笑、一个昵称，以及大量象征意义。', 'strawberry'),
  character('shoko-nishimiya', 'Shoko Nishimiya', '西宫硝子', 'A Silent Voice', 'ISFP', ['Gentle', 'Patient', 'Brave'], ['温柔', '耐心', '勇敢'], 'You value softness that survives hard things and still chooses connection.', '你珍视经历重压后仍然选择靠近的柔软。', 'pearl', 65),
  character('power', 'Power', '帕瓦', 'Chainsaw Man', 'ESTP', ['Loud', 'Impulsive', 'Absurd'], ['大声', '冲动', '离谱'], 'You want maximum chaos confidence, zero filter, and a result your friends will immediately roast.', '你想要满格混沌自信、零过滤发言，以及朋友会立刻吐槽的结果。', 'blood'),
  character('yoruichi-shihouin', 'Yoruichi Shihouin', '四枫院夜一', 'Bleach', 'ESTP', ['Confident', 'Agile', 'Teasing'], ['自信', '敏捷', '会逗'], 'You like speed, swagger, and someone who wins before the tutorial finishes loading.', '你喜欢速度、自信，以及教程还没加载完就已经赢了的人。', 'plum', 70),
  character('aqua', 'Aqua', '阿库娅', 'KonoSuba', 'ESFP', ['Dramatic', 'Radiant', 'Disaster-prone'], ['戏剧化', '闪亮', '容易翻车'], 'Your ideal waifu may not fix the problem, but the episode will absolutely not be boring.', '你的理想二次元老婆不一定解决问题，但这一集绝对不会无聊。', 'ocean'),
  character('nino-nakano', 'Nino Nakano', '中野二乃', 'The Quintessential Quintuplets', 'ESFP', ['Bold', 'Stylish', 'Intense'], ['大胆', '时髦', '强烈'], 'You want bold affection, sharp style, and romance that enters the room before knocking.', '你想要大胆好感、锋利审美，以及还没敲门就进场的恋爱线。', 'magenta', 67),
  character('esdeath', 'Esdeath', '艾斯德斯', 'Akame ga Kill!', 'INTJ', ['Dominant', 'Icy', 'Uncompromising'], ['支配感', '冰冷', '不妥协'], 'Your algorithm result walked directly into the danger zone and asked for a reserved seat.', '你的算法结果直接走进危险区，还要求预留座位。', 'ice', 70),
  character('yuki-nagato', 'Yuki Nagato', '长门有希', 'The Melancholy of Haruhi Suzumiya', 'INTP', ['Silent', 'Alien logic', 'Reliable'], ['沉默', '外星逻辑', '可靠'], 'You like unreadable calm, impossible competence, and affection delivered in tiny system messages.', '你喜欢读不透的冷静、离谱的能力，以及像系统消息一样微小的好感。', 'midnight', 66),
  character('satsuki-kiryuin', 'Satsuki Kiryuin', '鬼龙院皐月', 'Kill la Kill', 'ENTJ', ['Imperious', 'Disciplined', 'Commanding'], ['女王感', '自律', '统率力'], 'Your ideal match does not enter the room; she establishes jurisdiction over it.', '你的理想匹配不是走进房间，而是直接宣布这里归她管。', 'royal', 72),
  character('haruhi-suzumiya', 'Haruhi Suzumiya', '凉宫春日', 'The Melancholy of Haruhi Suzumiya', 'ENTP', ['Restless', 'Bold', 'Reality-bending'], ['停不下来', '大胆', '改写现实'], 'You want someone whose boredom is a global event and whose enthusiasm ignores physics.', '你想要那种无聊起来能变成全球事件、热情起来无视物理的人。', 'sunset', 68),
  character('shinobu-kocho', 'Shinobu Kocho', '蝴蝶忍', 'Demon Slayer', 'INFJ', ['Gentle smile', 'Hidden edge', 'Precise'], ['温柔笑容', '暗藏锋芒', '精准'], 'You are drawn to softness with a blade behind it and a smile that has footnotes.', '你会被带刀的温柔吸引，那种笑容后面还带脚注。', 'lavender', 67),
  character('hitori-gotou', 'Hitori Gotou', '后藤一里', 'Bocchi the Rock!', 'INFP', ['Anxious', 'Creative', 'Earnest'], ['社恐', '有创造力', '真诚'], 'Your heart picked the shy genius route with maximum inner monologue and surprise guitar damage.', '你的心选择了害羞天才路线：内心独白拉满，吉他伤害突然爆表。', 'bubblegum', 64),
  character('emilia', 'Emilia', '爱蜜莉雅', 'Re:Zero', 'ENFJ', ['Idealistic', 'Kind', 'Resolute'], ['理想主义', '善良', '坚定'], 'You want radiant kindness with enough resolve to keep choosing the hard route.', '你想要明亮的善意，并且有足够决心继续选择困难路线。', 'pearl', 66),
  character('yui-hirasawa', 'Yui Hirasawa', '平泽唯', 'K-On!', 'ENFP', ['Sunny', 'Impulsive', 'Musical'], ['阳光', '随性', '音乐感'], 'Your ideal match runs on joy, snacks, and sudden competence when the opening song starts.', '你的理想匹配靠快乐、点心和OP响起时的突然靠谱运行。', 'honey', 65),
  character('riza-hawkeye', 'Riza Hawkeye', '莉莎·霍克艾', 'Fullmetal Alchemist', 'ISTJ', ['Steady', 'Watchful', 'Loyal'], ['稳定', '警觉', '忠诚'], 'You want disciplined loyalty, quiet competence, and backup that never misses.', '你想要自律的忠诚、安静的实力，以及从不失手的支援。', 'brass', 70),
  character('hinata-hyuuga', 'Hinata Hyuuga', '日向雏田', 'Naruto', 'ISFJ', ['Gentle', 'Devoted', 'Brave'], ['温柔', '专一', '勇敢'], 'You prefer soft-spoken devotion that grows into real courage when it matters.', '你偏爱轻声的专情，并且它会在关键时刻长成真正的勇气。', 'sakura', 64),
  character('olivier-armstrong', 'Olivier Mira Armstrong', '奥利维亚·米拉·阿姆斯特朗', 'Fullmetal Alchemist', 'ESTJ', ['Severe', 'Fearless', 'Strategic'], ['严厉', '无畏', '战略型'], 'Your type has command presence so strong even the weather files a report.', '你的类型有强到连天气都要提交报告的统率感。', 'steel', 72),
  character('tohru-dragon', 'Tohru', '托尔', "Miss Kobayashi's Dragon Maid", 'ESFJ', ['Affectionate', 'Protective', 'Extra'], ['热情', '护短', '夸张'], 'You want domestic devotion with dragon-level commitment and absolutely no chill.', '你想要家务系深情，但承诺强度是龙级，而且完全不会收敛。', 'mint', 67),
  character('motoko-kusanagi', 'Motoko Kusanagi', '草薙素子', 'Ghost in the Shell', 'ISTP', ['Cool', 'Technical', 'Independent'], ['冷静', '技术型', '独立'], 'You respect quiet control, cybernetic precision, and someone who treats panic as a software bug.', '你欣赏安静的掌控、赛博级精准，以及把慌张当软件Bug处理的人。', 'gunmetal', 72),
  character('nezuko-kamado', 'Nezuko Kamado', '灶门祢豆子', 'Demon Slayer', 'ISFP', ['Protective', 'Gentle', 'Instinctive'], ['保护欲', '温柔', '直觉型'], 'You value wordless warmth, protective instincts, and emotions that do not need a monologue.', '你珍视不用台词也能传达的温暖、保护本能，以及不需要独白的情感。', 'rose', 63),
  character('ryuko-matoi', 'Ryuko Matoi', '缠流子', 'Kill la Kill', 'ESTP', ['Rebellious', 'Direct', 'Explosive'], ['叛逆', '直球', '爆发力'], 'Your match is raw momentum, zero patience, and the kind of entrance that damages scenery.', '你的匹配结果是纯粹冲劲、零耐心，以及会破坏布景的登场方式。', 'crimson', 70),
  character('misa-amane', 'Misa Amane', '弥海砂', 'Death Note', 'ESFP', ['Dramatic', 'Devoted', 'Spotlight-ready'], ['戏剧化', '投入', '聚光灯体质'], 'You want big feelings, camera-ready chaos, and affection with dangerous production value.', '你想要大份情绪、镜头感混沌，以及制作规格很危险的好感。', 'magenta', 66),
]

interface ExtraCharacterSource {
  id: string
  name: { en: string; zh: string }
  source: { en: string; zh: string }
  type: WaifuType
  vector: {
    expression: number
    temperature: number
    judgement: number
    order: number
    agency: number
    aura: number
  }
  traits: { en: string[]; zh: string[] }
  matchCopy: { en: string; zh: string }
}

const extraSourceCharacters: ExtraCharacterSource[] = [
  {
    id: "aisaka-taiga",
    name: {
      en: "Taiga Aisaka",
      zh: "逢坂大河"
    },
    source: {
      en: "Toradora!",
      zh: "龙与虎"
    },
    type: "ISFP",
    vector: {
      expression: 0.47,
      temperature: 0.24,
      judgement: -0.24,
      order: -0.47,
      agency: 0.47,
      aura: 0.47
    },
    traits: {
      en: [
        "Maximum Tsundere",
        "Legally Incapable of Self-Care",
        "Fights First, Asks Never"
      ],
      zh: [
        "极度傲娇",
        "生活九级伤残",
        "一言不合就开干"
      ]
    },
    matchCopy: {
      en: "Barely over 140 cm tall, yet her temper could blow the roof off — the \"Palm-Size Tiger.\" Always armed with a wooden sword, aggressively hostile, but with self-care skills stuck at absolute zero. Peel back that prickly, violent shell and you'll find a girl who craves love so desperately she can't even figure out her own feelings.",
      zh: "身高一米四出头，脾气却能掀翻屋顶的“掌中老虎”。随身携带木刀，具有强烈的攻击性，但生活自理能力基本为零。剥开那一层带刺且暴力的外壳，里面藏着的其实是一个极度渴望被爱、笨拙到连自己心意都搞不清楚的小女孩。"
    }
  },
  {
    id: "akiyama-mio",
    name: {
      en: "Mio Akiyama",
      zh: "秋山澪"
    },
    source: {
      en: "K-ON!",
      zh: "轻音少女"
    },
    type: "ISFJ",
    vector: {
      expression: -0.24,
      temperature: 0.24,
      judgement: 0.49,
      order: 0.73,
      agency: 0.24,
      aura: 0.24
    },
    traits: {
      en: [
        "Gap Moe Supreme",
        "Lyrics That Make Bros Cry",
        "Left-Handed Legend"
      ],
      zh: [
        "反差萌",
        "猛男必听萌系歌词",
        "左撇子"
      ]
    },
    matchCopy: {
      en: "She's got the face of a cool, mature beauty, yet one ghost story is enough to send her into a full panic meltdown. As the team's sole voice of reason, she teeters on the edge of a breakdown every day just trying to keep order. Don't let her serious demeanor fool you — the lyrics she writes are so sickeningly sweet they'll make grown men weep.",
      zh: "明明长着一张高冷御姐的脸，却能被一个鬼故事吓得魂飞魄散。作为团队里唯一的常识人，每天都在崩溃的边缘努力维持秩序。别看她平时那么严肃，她写的歌词可是能让猛男落泪的究极甜妹风。"
    }
  },
  {
    id: "alya-kujou",
    name: {
      en: "Alya Kujou",
      zh: "艾莉"
    },
    source: {
      en: "Alya Sometimes Hides Her Feelings in Russian",
      zh: "时不时说一句俄语来掩饰害羞的邻座艾莉同学"
    },
    type: "INTJ",
    vector: {
      expression: -0.21,
      temperature: 0.21,
      judgement: 0.63,
      order: 0.42,
      agency: 0.42,
      aura: 0.42
    },
    traits: {
      en: [
        "Silver-Hair Enthusiasts Rejoice",
        "Ice Queen on borrowed ice",
        "Russian-Encoded Flirting"
      ],
      zh: [
        "白毛控狂喜",
        "高冷全靠装",
        "俄语加密娇羞"
      ]
    },
    matchCopy: {
      en: "On the outside, she's an untouchable silver-haired straight-A student; in private, she's constantly mumbling embarrassingly sweet lines in Russian. Your first impression is always \"hard to approach, impossibly high standards, probably grading everyone around her at all times.\" But the moment someone makes it onto your \"exceptions list,\" the walls quietly crumble — you just won't admit it. The type who \"looks like she's presiding over a cold courtroom, but is secretly leaving the back door unlocked for you.\"",
      zh: "看似是完美高冷、不容搭话的银发优等生，背地里却总是用俄语嘀咕些让人脸红心跳的娇羞台词。你给人的第一印象通常是不好接近、标准很高、像随时都在给周围人打分的类型。可一旦你开始把谁放进自己的「例外名单」，态度就会悄悄松动，嘴上还不承认。属于「表面高冷审判席，实际内心已经偷偷给你开后门」的类型。"
    }
  },
  {
    id: "amane-suzuha",
    name: {
      en: "Suzuha Amane",
      zh: "阿万音铃羽"
    },
    source: {
      en: "Steins;Gate",
      zh: "命运石之门"
    },
    type: "ESTP",
    vector: {
      expression: 0.41,
      temperature: 0.2,
      judgement: 0.2,
      order: 0,
      agency: 0.61,
      aura: 0.61
    },
    traits: {
      en: [
        "Okey Donkey",
        "John Titor",
        "Part-Time Warrior"
      ],
      zh: [
        "Okey Donkey",
        "约翰·提托",
        "打工战士"
      ]
    },
    matchCopy: {
      en: "A time traveler who rode a bicycle back from 2036 — far better at diving in to change the world than sitting around pondering life. You have a kind of pure execution power: once you lock onto a target, you charge in and fight to the bitter end. You couldn't care less what others think of you, but when it comes to the things and people who matter, your persistence borders on obsession. The type who \"never says a word, but will shoulder the entire world through action.\"",
      zh: "从2036年骑着自行车穿越回来的人，比起「思考人生」更擅长直接动手改变它。你身上有一种很纯粹的执行力——认准了目标就会冲上去，坚定地奋斗到底。你不是那种会在意别人怎么看自己的人，但你对重要的事和重要的人有着近乎执拗的追求。属于「嘴上不说，但会用行动把整个世界扛起来」的类型。"
    }
  },
  {
    id: "amiya",
    name: {
      en: "Amiya",
      zh: "阿米娅"
    },
    source: {
      en: "Arknights",
      zh: "明日方舟"
    },
    type: "INFJ",
    vector: {
      expression: 0.18,
      temperature: 0.36,
      judgement: 0.36,
      order: 0.36,
      agency: 0.54,
      aura: 0.54
    },
    traits: {
      en: [
        "Rhodes Island CEO",
        "Rabbit or Donut?",
        "Doctor's Guardian"
      ],
      zh: [
        "罗德岛CEO",
        "是兔子还是驴",
        "刀客塔的监护人"
      ]
    },
    matchCopy: {
      en: "On the surface, a sweet, adorable assistant who's always reminding you not to slack off; in reality, a young leader carrying the entire fate of Rhodes Island on her shoulders. She possesses a composure and decisiveness far beyond her years, yet the moment you're by her side, she breaks into the dependent smile of an ordinary girl.",
      zh: "表面上是乖巧可爱、随时提醒你不要休息的贴心小助理，实际上是背负着整个罗德岛命运的年轻领袖。她有着与年龄不符的沉稳与决断力，但只要你在身边，她又会露出少女那般依赖的笑容。"
    }
  },
  {
    id: "arima-kana",
    name: {
      en: "Kana Arima",
      zh: "有马加奈"
    },
    source: {
      en: "Oshi no Ko",
      zh: "我推的孩子"
    },
    type: "ENTJ",
    vector: {
      expression: 0.47,
      temperature: 0.24,
      judgement: 0.47,
      order: 0.24,
      agency: 0.47,
      aura: 0.47
    },
    traits: {
      en: [
        "Tsundere Past Her Expiration Date",
        "Ten-Second Crier",
        "Hat Rack Incarnate"
      ],
      zh: [
        "傲娇退环境受害者",
        "十秒落泪",
        "帽子架本体"
      ]
    },
    matchCopy: {
      en: "Her mouth spits the sharpest venom, yet her heart craves attention more than anyone. As a former child prodigy who \"can cry on cue in ten seconds,\" she channels every ounce of insecurity and frustration into raw competitive fire on stage. Praise her just a little, and her affection skyrockets like a rocket — the textbook \"support me and I'll shine for you\" ultimate tsundere.",
      zh: "嘴上总是说着最刻薄的话，心里却比谁都渴望被注视。作为「十秒就能哭出来」的前天才童星，她把所有的自卑和不甘都化作了舞台上的胜负欲。其实只要你稍微多夸她两句，她的好感度就会像火箭一样窜上天——属于典型的「只要你推我，我就能为你闪闪发光」的究极傲娇。"
    }
  },
  {
    id: "asuka-langley",
    name: {
      en: "Asuka Langley",
      zh: "明日香"
    },
    source: {
      en: "Neon Genesis Evangelion",
      zh: "新世纪福音战士"
    },
    type: "ESTP",
    vector: {
      expression: 0.55,
      temperature: 0.18,
      judgement: -0.18,
      order: -0.18,
      agency: 0.55,
      aura: 0.55
    },
    traits: {
      en: [
        "300% Stubbornness Rating",
        "Breakdown Scene Annual MVP",
        "Who Do You Think You Are"
      ],
      zh: [
        "嘴硬率300%",
        "破防名场面年度MVP",
        "你算哪块小饼干"
      ]
    },
    matchCopy: {
      en: "\"Who do you think you are\" is tsundere for \"please understand me.\" Her lectures spike your blood pressure; her breakdowns end up in your screenshot folder — the textbook \"argument BGM auto-plays on entry\" character. Recommended pairing: danmaku reading \"Asuka broke down again.\"",
      zh: "嘴上「你算什么」翻译过来是「快来懂我」。她骂人时你血压飙升，她破防时你截图发群——属于那种「出场自带吵架BGM」的典中典。建议搭配弹幕「明日香又又又破防了」食用。"
    }
  },
  {
    id: "atri",
    name: {
      en: "ATRI",
      zh: "亚托莉"
    },
    source: {
      en: "ATRI -My Dear Moments-",
      zh: "ATRI -My Dear Moments-"
    },
    type: "ENFP",
    vector: {
      expression: 0.54,
      temperature: 0.54,
      judgement: -0.18,
      order: -0.36,
      agency: 0.36,
      aura: 0.36
    },
    traits: {
      en: [
        "Self-Proclaimed High-Performance",
        "Post-Apocalyptic Sunshine",
        "Straight-Shot Companion"
      ],
      zh: [
        "高性能自称",
        "废土小太阳",
        "直球陪伴型"
      ]
    },
    matchCopy: {
      en: "You're the type who puts all your energy, bluntness, and desire to be there for others right out in the open. You call yourself high-performance, but what truly moves people is the raw sincerity and unfiltered emotion underneath. Even in the worst circumstances, you'll scrape together whatever warmth you have and share it with those around you. The type who \"looks breezy and bright on the surface, but can carry more weight than anyone at the core.\"",
      zh: "你像那种会把元气、直率和陪伴欲全部摆到台面上的人，嘴上说自己高性能，实际最打动人的却是情绪里的真诚和不保留。哪怕在很坏的环境里，你也会努力把一点点热量分给身边的人。属于“看起来轻快明亮，底层却比谁都能扛”的类型。"
    }
  },
  {
    id: "awa-subaru",
    name: {
      en: "Subaru Awa",
      zh: "安和昴"
    },
    source: {
      en: "Girls Band Cry",
      zh: "少女乐队的呐喊 (GBC)"
    },
    type: "ENFJ",
    vector: {
      expression: 0.29,
      temperature: 0.58,
      judgement: 0.29,
      order: 0.29,
      agency: 0.58,
      aura: 0.29
    },
    traits: {
      en: [
        "Sane One Among Hedgehogs",
        "Sly Compromiser",
        "Sweet Outside, Rebel Inside"
      ],
      zh: [
        "刺猬群里的正常人",
        "狡猾的妥协者",
        "表面乖巧内里叛逆"
      ]
    },
    matchCopy: {
      en: "In a band full of prickly personalities ready to explode at any moment, you're the only one who knows how to use \"acting\" to hold the situation together — a cunning adult-in-training. You know exactly how to play along with grown-ups' expectations, so you smash all your rebellion and frustration into the drum beats instead. It's not that you don't have a temper — you just know exactly when to go wild and when to play nice.",
      zh: "在一个全员带刺、动不动就爆炸的乐队里，你是唯一一个懂得用「演技」来维持局面的狡猾大人预备役。你太清楚怎么敷衍大人的期待，所以把所有的叛逆和不甘都砸碎在鼓点里。你不是没脾气，你只是知道什么时候该发疯，什么时候该装乖。"
    }
  },
  {
    id: "ayachi-nene",
    name: {
      en: "Nene Ayachi",
      zh: "绫地宁宁"
    },
    source: {
      en: "Sabbat of the Witch",
      zh: "魔女的夜宴"
    },
    type: "ISFJ",
    vector: {
      expression: 0.24,
      temperature: 0.73,
      judgement: 0.24,
      order: 0.49,
      agency: 0.24,
      aura: 0.24
    },
    traits: {
      en: [
        "Honor Student Witch",
        "Pure Love Tolerance Mode",
        "Contract-Type Social Death Magnet"
      ],
      zh: [
        "优等生魔女",
        "纯爱系包容力",
        "契约型社死体质"
      ]
    },
    matchCopy: {
      en: "First impression: composed, reliable, handles chaos without letting things spiral. But once responsibility, secrets, and feelings start stacking, you quietly absorb all the pressure. Looks like the one calming everyone down; actually the one who most needs gentle care.",
      zh: "你给人的第一印象往往是体面、稳妥、待人周到，像那种再混乱都不会让场面失控的人。可一旦责任、秘密和情感开始叠加，你又会把压力悄悄往自己身上吞。属于“表面像会安抚别人，实际上最需要被温柔呵护”的类型。"
    }
  },
  {
    id: "ayanami-rei",
    name: {
      en: "Rei Ayanami",
      zh: "绫波丽"
    },
    source: {
      en: "Neon Genesis Evangelion",
      zh: "新世纪福音战士"
    },
    type: "ISTP",
    vector: {
      expression: -0.57,
      temperature: -0.38,
      judgement: 0.38,
      order: 0.19,
      agency: 0.19,
      aura: 0.57
    },
    traits: {
      en: [
        "Smile Tax",
        "Bandage Aesthetic Founder",
        "AT Field Social Distance"
      ],
      zh: [
        "微笑税",
        "绷带美学创始人",
        "AT力场级社交距离"
      ]
    },
    matchCopy: {
      en: "Her total dialogue barely tops your daily forum scroll, yet her popularity ranks top three in all of history. Standing there, she IS the dictionary definition of \\\"cool and distant\\\" — you wouldn\\'t dare ask for directions, afraid she\\'d reply with \"どうでもいい.\" (Not my problem.)",
      zh: "全剧台词加起来不如你一天刷的贴吧多，但人气能杀进历史前三。她站在那里就是「高冷」的词典释义——你甚至不敢问路，怕她回你一句「どうでもいい」（关我屁事）。"
    }
  },
  {
    id: "azuma-seren",
    name: {
      en: "Azuma Seren",
      zh: "东雪莲"
    },
    source: {
      en: "Blanche Fleur",
      zh: "Blanche Fleur"
    },
    type: "ENFP",
    vector: {
      expression: 0.61,
      temperature: 0.2,
      judgement: 0,
      order: -0.2,
      agency: 0.41,
      aura: 0.61
    },
    traits: {
      en: [
        "Vampire Who Faints at Blood",
        "Gorgeous Lore, Cursed Reality",
        "Abstract Songstress"
      ],
      zh: [
        "吸血鬼但晕血",
        "设定华丽落地很怪",
        "抽象歌姬"
      ]
    },
    matchCopy: {
      en: "You give off the vibe of someone whose character art drops and everyone expects a graceful, composed, floating-in-midair type — then you open your mouth and immediately hijack the entire channel into bizarre comedy territory. It's not that you lack a beauty filter; it's just that your weirdness, raw personality, and absurd contrast keep stealing the spotlight. The type whose \"lore reads like moonlit aristocracy, but actual performance is a chaos engine.\"",
      zh: "你给人的感觉像那种立绘一出来全场都以为会很仙、很稳、很像高空悬浮系角色，结果一开口就把频道拐进奇怪笑点的人。你不是没有美型滤镜，只是那层滤镜经常会被更强的怪话感、活人感和反差感抢镜。属于“设定写得像月下贵族，实际演出像抽象发动机”的类型。"
    }
  },
  {
    id: "azusagawa-kaede",
    name: {
      en: "Kaede Azusagawa",
      zh: "梓川枫"
    },
    source: {
      en: "Rascal Does Not Dream of Bunny Girl Senpai",
      zh: "青春猪头少年不会梦到兔女郎学姐"
    },
    type: "INFP",
    vector: {
      expression: -0.67,
      temperature: 0.67,
      judgement: 0,
      order: 0,
      agency: 0,
      aura: 0.33
    },
    traits: {
      en: [
        "Peak Bro-Con",
        "Cuteness Is Her Only Skill",
        "Afraid of the Outside"
      ],
      zh: [
        "兄控天花板",
        "看家本领是卖萌",
        "畏惧外界"
      ]
    },
    matchCopy: {
      en: "A hardcore shut-in wrapped in panda pajamas, treating her big brother as the absolute center of her universe. Terrified of the outside world's gaze, she locked herself indoors — yet for her brother's sake, she'll summon every ounce of willpower to accomplish something as mundane as \"walking two steps outside.\" Every time she gathers courage, it tugs at your heart so hard you want to buy her a truckload of pudding.",
      zh: "披着熊猫睡衣的重度家里蹲，把“哥哥”视为全世界的绝对中心。因为惧怕外界的视线而把自己锁在家里，但却愿意为了哥哥，用尽全身力气去完成“出门走两步”这种常人看来微不足道的小事。她的每一次鼓起勇气，都让人心疼到想给她买一车布丁。"
    }
  },
  {
    id: "bilibili-22",
    name: {
      en: "22 Niang",
      zh: "22娘"
    },
    source: {
      en: "bilibili",
      zh: "bilibili"
    },
    type: "ENFP",
    vector: {
      expression: 0.58,
      temperature: 0.58,
      judgement: 0.19,
      order: 0,
      agency: 0.38,
      aura: 0.38
    },
    traits: {
      en: [
        "Sunshine Energy",
        "Enthusiastic but Clumsy",
        "Content Reviewer"
      ],
      zh: [
        "阳光元气",
        "热心冒失",
        "审核员"
      ]
    },
    matchCopy: {
      en: "You're the type who rushes in to help first, only to realize halfway through that you might have made things even more chaotic. Your infectious energy is off the charts — when the mood dips, you'll try to pull it up; when a friend's in trouble, you'll step up first. The execution sometimes veers off into weird directions, though. The type who \"may not be the most reliable, but is absolutely the most alive person in the room.\"",
      zh: "你属于那种会先冲上去帮忙、帮到一半再发现自己可能把场面搞得更热闹的人。你有很强的感染力，气氛低了会想拉起来，朋友出事了会先站出来，可执行过程有时又会拐进奇怪的方向。属于“虽然不一定最稳，但一定是全场最有活人感的那个”的类型。"
    }
  },
  {
    id: "bilibili-33",
    name: {
      en: "33 Niang",
      zh: "33娘"
    },
    source: {
      en: "bilibili",
      zh: "bilibili"
    },
    type: "INTP",
    vector: {
      expression: -0.45,
      temperature: 0,
      judgement: 0.45,
      order: 0.45,
      agency: 0.45,
      aura: 0.45
    },
    traits: {
      en: [
        "Woman of Few Words",
        "Quietly Scheming",
        "Programmer Android Girl"
      ],
      zh: [
        "沉默寡言",
        "轻微腹黑",
        "程序员机娘"
      ]
    },
    matchCopy: {
      en: "You seem like the type who never starts the party and can barely be bothered to explain yourself — but the moment something breaks, everyone instinctively turns to you. You might not be the best at comforting people, but you're often the one who actually gets things fixed. The type who \"looks like a low-power, emotionless shell on the surface, but is actually running the core backend thread.\"",
      zh: "你看起来像那种不会主动制造热闹、甚至还有点懒得解释的人，但系统一出问题就会有人下意识找你。你不一定最会安慰人，却经常是最能把事情真正修好的人。属于“表面低功耗三无，实则后台核心线程”的类型。"
    }
  },
  {
    id: "cartethyia",
    name: {
      en: "Cartethyia",
      zh: "卡提希娅"
    },
    source: {
      en: "Wuthering Waves",
      zh: "鸣潮"
    },
    type: "INFJ",
    vector: {
      expression: -0.19,
      temperature: 0.19,
      judgement: 0.57,
      order: 0.38,
      agency: 0.38,
      aura: 0.57
    },
    traits: {
      en: [
        "Saintly Aura",
        "Mission-Driven",
        "Solemnly Restrained"
      ],
      zh: [
        "圣女感",
        "使命驱动",
        "庄严克制"
      ]
    },
    matchCopy: {
      en: "You're not the type to broadcast your feelings — most of them get buried under bigger goals. What others see is calm, solemn detachment; those who know you better discover that beneath the stillness lies an incredibly heavy sense of responsibility. The type where \"the more saintly she appears, the more she's already prepared to pay the price.\"",
      zh: "你不是那种会高调表达自己的人，很多情绪都会被你压进更大的目标里。别人看到的是平静、庄严和距离感，真正熟一点才会发现，那层安静下面其实是非常沉的责任心。属于“越像圣女，越说明她已经准备好付代价”的类型。"
    }
  },
  {
    id: "chihaya-anon",
    name: {
      en: "Anon Chihaya",
      zh: "千早爱音"
    },
    source: {
      en: "BanG Dream! It's MyGO!!!!!",
      zh: "BanG Dream! It's MyGO!!!!!"
    },
    type: "ESFJ",
    vector: {
      expression: 0.61,
      temperature: 0.41,
      judgement: 0,
      order: -0.2,
      agency: 0.61,
      aura: 0.2
    },
    traits: {
      en: [
        "Board First Ask Questions Later",
        "Social Ignition Switch",
        "Digs Own Pit Falls In"
      ],
      zh: [
        "先上车再补票",
        "社交启动器",
        "自己挖坑自己跳"
      ]
    },
    matchCopy: {
      en: "Your life strategy is \"blend in first, figure it out later.\" Smooth on the surface, but you often charge in too fast and land in the drama yourself — no worries, you\\'ll use new social skills to cover the old mess.",
      zh: "你的人生策略是「先混进去再说」。表面上圆滑，实际上经常因为冲太快把自己冲进修罗场——但没关系，你会用新的社牛把旧坑填上。属于「社牛但容易翻车」的典型。"
    }
  },
  {
    id: "chitanda-eru",
    name: {
      en: "Eru Chitanda",
      zh: "千反田爱瑠"
    },
    source: {
      en: "Hyouka",
      zh: "冰菓"
    },
    type: "ENFJ",
    vector: {
      expression: 0.47,
      temperature: 0.71,
      judgement: 0,
      order: 0,
      agency: 0.24,
      aura: 0.47
    },
    traits: {
      en: [
        "Eyes Light Up, Plot Starts",
        "Refined Heiress",
        "Elegant Question Machine"
      ],
      zh: [
        "眼睛一亮就开主线",
        "豪农大小姐",
        "优雅追问机"
      ]
    },
    matchCopy: {
      en: "You normally carry yourself with the poise of a perfectly raised heiress — polished, polite, impeccably measured. But the second something triggers your interest, you flip instantly from \"dignified mode\" into \"interrogate-until-I-get-answers mode.\" You're not a loud protagonist engine — you're the type who drags everyone into the main quest with a single \"I'm curious!\"",
      zh: "你平时气质很稳，像那种教养、礼貌、分寸感都在线的高配大小姐模板；但只要某件事触发了你的兴趣，整个人就会瞬间从“端庄模式”切进“追问到底模式”。你不是吵闹型主角推进器，而是那种用一句“我很好奇”就能把所有人拖进主线任务的人。"
    }
  },
  {
    id: "cirno",
    name: {
      en: "Cirno",
      zh: "琪露诺"
    },
    source: {
      en: "Touhou Project",
      zh: "东方Project"
    },
    type: "ESTP",
    vector: {
      expression: 0.56,
      temperature: 0.37,
      judgement: -0.37,
      order: -0.37,
      agency: 0.37,
      aura: 0.37
    },
    traits: {
      en: [
        "Ice Fairy (Self-Proclaimed Strongest)",
        "IQ Traded for Combat Power",
        "Math Genius (Not)"
      ],
      zh: [
        "冰之妖精（自称最强）",
        "智商换战力",
        "数学鬼才"
      ]
    },
    matchCopy: {
      en: "Never got a math problem right, but never backed down from a fight either. Her greatest charm: she gets one-shot every time, yet always keeps that \"I'm the strongest\" confident grin — the absolute ceiling of the idiot world. Just being cute is enough. The Touhou fandom's officially designated \"⑨\" meme supplier.",
      zh: "算术题没对过，但打架没怂过。她最大的魅力是：明明每次都被秒，但永远保持「本小姐最强」的自信笑容——属于笨蛋界的天花板，萌就完事了。东方圈唯一指定「⑨」表情包供应商。"
    }
  },
  {
    id: "doro",
    name: {
      en: "doro",
      zh: "doro"
    },
    source: {
      en: "GODDESS OF VICTORY: NIKKE",
      zh: "胜利女神：妮姬"
    },
    type: "ENTP",
    vector: {
      expression: 0.47,
      temperature: 0,
      judgement: -0.47,
      order: -0.47,
      agency: 0.32,
      aura: 0.47
    },
    traits: {
      en: [
        "Innocent Eyes, Empty Brain",
        "Always Facing Away",
        "NIKKE Spirit Animal"
      ],
      zh: [
        "眼神清澈但愚蠢",
        "背对着你",
        "妮姬精神图腾"
      ]
    },
    matchCopy: {
      en: "Her original form is the noble Pilgrim Dorothy, yet the internet abstracted her into this blank-staring, psychologically corrosive four-legged creature. You'll never know what's brewing behind that vacant smile, but the moment she appears, the entire channel's collective IQ takes a nosedive. Recommended: do not make eye contact.",
      zh: "明明本体是高贵的朝圣者桃乐丝，却被网友抽象成了这只眼神呆滞、极具精神污染的四足生物。你永远不知道她那空洞的微笑背后在盘算什么，但只要她一出现，整个频道的智商都会被拉低。建议不要直视她的眼睛。"
    }
  },
  {
    id: "eis-taffy",
    name: {
      en: "Eis Taffy",
      zh: "永雏塔菲"
    },
    source: {
      en: "VTuber",
      zh: "虚拟主播"
    },
    type: "ENTP",
    vector: {
      expression: 0.58,
      temperature: 0.38,
      judgement: 0,
      order: -0.19,
      agency: 0.58,
      aura: 0.38
    },
    traits: {
      en: [
        "Solo Server Top Ace",
        "Time Machine Missed Stop",
        "Argument Generator Supreme"
      ],
      zh: [
        "单机区王牌",
        "时光机误点现代",
        "嘴硬整活发动机"
      ]
    },
    matchCopy: {
      en: "Not just talkative — capable of stretching one line into a full segment. Looks like chaotic content; actually weaving rhythm, reactions, and persona management into one controlled bundle. Open stream, scene automatically organizes itself into structured chaos.",
      zh: "你不是单纯话多，你是能把一句话拧成一整段节目效果。表面像在整活，实际上是在把节奏、反应和人设运营拧成一股绳，属于那种「直播一开，场子就自动开始乱中有序」的类型。"
    }
  },
  {
    id: "elaina",
    name: {
      en: "Elaina",
      zh: "伊蕾娜"
    },
    source: {
      en: "Wandering Witch",
      zh: "魔女之旅"
    },
    type: "INTP",
    vector: {
      expression: 0.27,
      temperature: 0,
      judgement: 0.53,
      order: -0.27,
      agency: 0.53,
      aura: 0.53
    },
    traits: {
      en: [
        "High-Mobility Traveler",
        "Polite but Not a Saint",
        "Genius Witch"
      ],
      zh: [
        "高机动旅人",
        "礼貌但不圣母",
        "天才魔女"
      ]
    },
    matchCopy: {
      en: "You're not the type to force yourself into every storyline — more like a premium traveler who passes through, observes, and records along the way. Polite and restrained on the outside, clear-headed in judgment, never one to morally overload. But the moment the world gets interesting enough, your curiosity instantly kicks into gear. The type who \"seems totally unfazed, but actually has zero resistance to a good story.\"",
      zh: "你不是那种会强行把自己塞进所有剧情里的人，更像一路路过、一路观察、一路记录的高配旅人。外表礼貌克制，判断也很清醒，遇事不会轻易道德过载；但只要世界足够有趣，你的好奇心又会立刻上线。属于“看起来淡淡的，实际上对新鲜故事最没抵抗力”的类型。"
    }
  },
  {
    id: "elysia",
    name: {
      en: "Elysia",
      zh: "爱莉希雅"
    },
    source: {
      en: "Honkai Impact 3rd",
      zh: "崩坏3"
    },
    type: "ENFJ",
    vector: {
      expression: 0.53,
      temperature: 0.53,
      judgement: 0.18,
      order: 0,
      agency: 0.35,
      aura: 0.53
    },
    traits: {
      en: [
        "Social Terrorist Supreme",
        "Pink Filter Incarnate",
        "Radiant as Falling Petals"
      ],
      zh: [
        "社交悍匪天花板",
        "粉色滤镜本体",
        "如飞花般绚丽"
      ]
    },
    matchCopy: {
      en: "On the surface, a pink social butterfly who loves cuddles and spouts honeyed words; in truth, she turned \"loving everyone\" into a lifelong creed. She's not without sorrow — she simply chooses to leave her most radiant, flawless smile for the world. The kind of goddess who \"brings her own pink spotlight the moment she enters.\" Keep tissues handy: you'll be smiling one moment and emotionally devastated the next.",
      zh: "表面上是个喜欢贴贴、满嘴甜言蜜语的粉色社牛，实际上把「爱所有人」当成了一生贯彻的信仰。她不是没有悲伤，只是选择把最绚丽无瑕的笑容留给世界——属于那种「一出场就自带粉色聚光灯」的神。建议备好纸巾，笑着笑着就让人破防了。"
    }
  },
  {
    id: "evil-neuro",
    name: {
      en: "Evil Neuro",
      zh: "Evil Neuro"
    },
    source: {
      en: "VTuber",
      zh: "虚拟主播"
    },
    type: "INTJ",
    vector: {
      expression: 0.17,
      temperature: -0.17,
      judgement: 0.52,
      order: 0.35,
      agency: 0.52,
      aura: 0.52
    },
    traits: {
      en: [
        "Smiling While Saying the Meanest Things",
        "Intimidation Is Factory Default",
        "Villainy With High Stage Value"
      ],
      zh: [
        "笑着说最狠的话",
        "压迫感是出厂设置",
        "坏得很有舞台观赏性"
      ]
    },
    matchCopy: {
      en: "You perfectly merged aggression, control instincts, and chaos energy into a full villain performance. Razor-sharp on the surface, maximum pressure — but with precise calibration that keeps you from ever becoming fully irredeemable. An advanced tsundere variant.",
      zh: "你把攻击性、控场欲和乐子人属性完美融合成了一场反派演出。表面上句句带刺、极具压迫感，暗地里却又精准把控着没法彻底做坏人的别扭分寸——属于高级傲娇的变种形态。"
    }
  },
  {
    id: "eyjafjalla",
    name: {
      en: "Eyjafjalla",
      zh: "艾雅法拉"
    },
    source: {
      en: "Arknights",
      zh: "明日方舟"
    },
    type: "INFJ",
    vector: {
      expression: -0.2,
      temperature: 0.59,
      judgement: 0.39,
      order: 0.39,
      agency: 0.39,
      aura: 0.39
    },
    traits: {
      en: [
        "Senpai!",
        "Losing Her Hearing",
        "Strongest Caster DPS"
      ],
      zh: [
        "前辈！",
        "听力受损",
        "最强法系输出"
      ]
    },
    matchCopy: {
      en: "Beneath the frail, obedient underclassman exterior lies volcanic magic powerful enough to melt an entire battlefield in an instant. Oripathy is slowly stealing her hearing and sight, yet she remains devoted to pursuing her parents' volcanic research. That sweet \"Senpai!\" after every battle is the best painkiller against this wasteland's cruel world.",
      zh: "柔弱乖巧的学妹外表下，藏着能瞬间融化整个战场的毁灭性火山魔法。尽管身体正被矿石病一点点夺走听力与视力，她依然执着于探寻父母留下的火山研究。每次战斗结束后那声甜甜的“前辈”，是对抗这片废土残酷世界最好的止痛药。"
    }
  },
  {
    id: "firefly",
    name: {
      en: "Firefly",
      zh: "流萤"
    },
    source: {
      en: "Honkai: Star Rail",
      zh: "崩坏：星穹铁道"
    },
    type: "INFJ",
    vector: {
      expression: 0,
      temperature: 0.43,
      judgement: 0.43,
      order: 0.21,
      agency: 0.43,
      aura: 0.64
    },
    traits: {
      en: [
        "Gentle Shell",
        "Destiny-Driven",
        "Burning Oneself"
      ],
      zh: [
        "温柔外壳",
        "宿命感",
        "燃烧自己"
      ]
    },
    matchCopy: {
      en: "You come across as someone who speaks softly, moves lightly, and keeps emotions barely there — like you'd scatter in the wind. But when it's time to make a real decision, you turn iron-willed, even ready to stake yourself on the outcome. The type who \"looks the most fragile, but can actually shoulder the most.\"",
      zh: "你表面像那种说话轻、动作轻、情绪也轻的人，仿佛风一吹就会散。但真正遇到必须做决定的时刻，你反而会非常坚定，甚至带一点把自己也一起押上去的决绝。属于“看起来最脆，实际最能扛”的类型。"
    }
  },
  {
    id: "furina",
    name: {
      en: "Furina",
      zh: "芙宁娜"
    },
    source: {
      en: "Genshin Impact",
      zh: "原神"
    },
    type: "ESFP",
    vector: {
      expression: 0.57,
      temperature: 0.38,
      judgement: 0.19,
      order: 0.19,
      agency: 0.38,
      aura: 0.57
    },
    traits: {
      en: [
        "Courtroom Award Queen",
        "Solo-Carried 500 Years",
        "Cake-Eating Metabolism"
      ],
      zh: [
        "法庭影后",
        "一人扛五百年",
        "吃蛋糕不胖体质"
      ]
    },
    matchCopy: {
      en: "You thought she was a high-profile Diva. Turns out she's a miserable wage slave who performed a one-woman show for five hundred years straight. Her most savage trait isn't her acting — it's the way she'll hold a wine glass and declare \"everything is going according to plan\" while literally falling apart. Someone hand her the \"Genshin Best Actress\" and \"Most Tragic Worker\" awards.",
      zh: "你以为她是高调Diva，后来发现她是独自演了五百年独角戏的苦逼打工人。她最狠的不是演技，是明明快碎了还要端着红酒杯说「一切都在我计划之中」。建议颁发「原神最佳表演奖」和「最惨打工人奖」。"
    }
  },
  {
    id: "furukawa-nagisa",
    name: {
      en: "Nagisa Furukawa",
      zh: "古河渚"
    },
    source: {
      en: "CLANNAD",
      zh: "Clannad"
    },
    type: "ISFJ",
    vector: {
      expression: 0.24,
      temperature: 0.73,
      judgement: 0.24,
      order: 0.24,
      agency: -0.24,
      aura: 0.49
    },
    traits: {
      en: [
        "Cries at the Drop of a Hat",
        "Dango Obsessive",
        "Gentle Outside, Steel Inside"
      ],
      zh: [
        "极其爱哭",
        "团子狂魔",
        "外柔内刚"
      ]
    },
    matchCopy: {
      en: "She looks like a fragile girl who'd blow over in the wind, so lacking in confidence she often stalls completely. But in truth, she possesses a heart tougher than anyone's — once she's fighting for someone she loves, she'll grit her teeth through any despair. Her spring-breeze gentleness has a magical quality that makes you tear up without even noticing.",
      zh: "看起来像个风一吹就会倒的软弱少女，缺乏自信到常常停滞不前。但实际上，她拥有一颗比谁都坚韧的心，一旦为了爱的人，哪怕面临绝望也能咬牙走下去。她那如春风般的温柔，拥有让人不知不觉落泪的魔力。"
    }
  },
  {
    id: "haibara-ai",
    name: {
      en: "Ai Haibara",
      zh: "灰原哀"
    },
    source: {
      en: "Detective Conan",
      zh: "名侦探柯南"
    },
    type: "INTJ",
    vector: {
      expression: -0.42,
      temperature: -0.21,
      judgement: 0.63,
      order: 0.42,
      agency: 0.21,
      aura: 0.42
    },
    traits: {
      en: [
        "Shinigami Kid's Brakes",
        "Poison-Tongued Queen",
        "APTX4869 Inventor"
      ],
      zh: [
        "死神小学生的刹车片",
        "毒舌女王",
        "APTX4869发明家"
      ]
    },
    matchCopy: {
      en: "You'd think she's a cold-blooded scientist, but she's actually the show's most sharp-witted straight woman. Daily duties include researching the antidote and using icy language to hit the brakes on a certain Shinigami elementary schooler. Her dry humor is as lethal as the drug she invented — the textbook case of \"says nothing, then every word is a critical hit.\"",
      zh: "你以为她是冷血无情的科学家，其实她是全剧最清醒的吐槽担当。日常工作除了研究解药，就是用冰冷的语言给某位死神小学生踩刹车。她的冷幽默就像她发明的药一样致命——属于「不开口则已，一开口刀刀暴击」的典范。"
    }
  },
  {
    id: "hakurei-reimu",
    name: {
      en: "Reimu Hakurei",
      zh: "博丽灵梦"
    },
    source: {
      en: "Touhou Project",
      zh: "东方Project"
    },
    type: "ISTP",
    vector: {
      expression: 0.25,
      temperature: 0.25,
      judgement: 0.25,
      order: 0,
      agency: 0.75,
      aura: 0.5
    },
    traits: {
      en: [
        "Donations = Zero",
        "Combat Power = ∞",
        "Incidents Are For Punching"
      ],
      zh: [
        "香火钱=0",
        "战力∞",
        "异变就是拿来揍的"
      ]
    },
    matchCopy: {
      en: "The shrine is poor enough to raise mosquitoes, but her popularity keeps the entire Touhou ecosystem alive. You may think she is slacking, but she has simply hidden the word \"win\" under a lazy exterior. Famous line: \"No money? Then beat up whoever caused trouble.\" A model of being poor with absolute confidence.",
      zh: "神社穷得养蚊子，但她人气养活了整个东方圈。你以为她在摆烂，其实她只是把「赢」字写在了懒狗皮下面。名言：「没钱？那就把惹事的揍一顿」。属于「穷得理直气壮」的典范。"
    }
  },
  {
    id: "hatsune-miku",
    name: {
      en: "Hatsune Miku",
      zh: "初音未来"
    },
    source: {
      en: "VOCALOID",
      zh: "VOCALOID"
    },
    type: "ENFP",
    vector: {
      expression: 0.59,
      temperature: 0.39,
      judgement: 0,
      order: 0,
      agency: 0.59,
      aura: 0.39
    },
    traits: {
      en: [
        "Digital Leek Harvester",
        "Leek Field Perpetual Motion Machine",
        "Air Guitar World Champion"
      ],
      zh: [
        "电子韭菜收割机",
        "葱田永动机",
        "演唱会空气吉他冠军"
      ]
    },
    matchCopy: {
      en: "You thought she was a songstress? She's actually a 2D civil servant — concert schedules denser than a salaryman's overtime. One flick of those leek-green twin tails and the danmaku auto-spams \"world's cutest\" even if you didn't catch a single lyric. The textbook case of \"I don't know her, but I've used her memes.\"",
      zh: "你以为她是歌姬，其实她是二次元公务员——演唱会排期比社畜加班还密，葱色双马尾一晃，弹幕自动刷「世最可」，哪怕你根本没听清歌词。属于那种「我不认识她，但我刷过她的表情包」的典中典。"
    }
  },
  {
    id: "hoshino-ruby",
    name: {
      en: "Ruby Hoshino",
      zh: "星野露比"
    },
    source: {
      en: "Oshi no Ko",
      zh: "我推的孩子"
    },
    type: "ENFP",
    vector: {
      expression: 0.52,
      temperature: 0.35,
      judgement: 0.17,
      order: -0.17,
      agency: 0.52,
      aura: 0.52
    },
    traits: {
      en: [
        "Reincarnated Idol",
        "Ultimate Brother Complex",
        "Stage Perpetual Motion"
      ],
      zh: [
        "转生系爱豆",
        "究极兄控",
        "舞台永动机"
      ]
    },
    matchCopy: {
      en: "With the heavy obsession of a past life and natural talent already maxed out, you were born to live under the spotlight. On the surface, you look like a bright and brainless bundle of energy, but inside burns a frightening will to win. For that sparkling dream, you would package your whole life as the most dazzling lie and spend everything on stage.",
      zh: "带着前世的沉重执念和满级天赋，你天生就是要吃这碗聚光灯饭的人。表面上是个无脑元气笨蛋，内心却燃烧着让人畏惧的胜负欲。为了那个闪闪发光的梦想，你甚至愿意把整个人生包装成最华丽的谎言，在舞台上连命都可以不要。"
    }
  },
  {
    id: "ijichi-nijika",
    name: {
      en: "Nijika Ijichi",
      zh: "伊地知虹夏"
    },
    source: {
      en: "Bocchi the Rock!",
      zh: "孤独摇滚！"
    },
    type: "ESFJ",
    vector: {
      expression: 0.52,
      temperature: 0.52,
      judgement: 0.17,
      order: 0.17,
      agency: 0.52,
      aura: 0.35
    },
    traits: {
      en: [
        "Shimokitazawa Archangel",
        "Kessoku Band Mom",
        "Ahoge Core"
      ],
      zh: [
        "下北泽大天使",
        "结束乐队老妈",
        "呆毛本体"
      ]
    },
    matchCopy: {
      en: "You are the kind of person who can gather scattered people back together. The security you give others comes not only from warmth, but from how you actively care for the mood, share pressure, and stabilize the situation before everyone falls apart. You look like the cheerful atmosphere maker, but you are actually the team's life support.",
      zh: "你是那种能把散掉的人重新拢回来的人。你给人的安全感不只来自热情，更来自你会主动照顾气氛、分担压力，并在所有人都快乱成一团时先一步把局面稳住。属于“看起来像阳角气氛组，实际上是团队续命核心”的类型。"
    }
  },
  {
    id: "inaba-meguru",
    name: {
      en: "Meguru Inaba",
      zh: "因幡巡"
    },
    source: {
      en: "Sabbat of the Witch",
      zh: "魔女的夜宴"
    },
    type: "ENFP",
    vector: {
      expression: 0.64,
      temperature: 0.43,
      judgement: 0,
      order: -0.21,
      agency: 0.43,
      aura: 0.43
    },
    traits: {
      en: [
        "Social Outside, Homebody Inside",
        "High Attack Low Defense",
        "Fast Warm-Up, Slow Trust"
      ],
      zh: [
        "表面社牛内里宅",
        "高攻低防",
        "热场快但交心慢"
      ]
    },
    matchCopy: {
      en: "You look like the kind of lively junior who can lift the mood the moment you arrive: natural smile, quick replies, and an apparent instinct for getting along with everyone. Once people know you better, they find that your extroversion is more like a trained shell. You can warm up a room, act fine, and hide real loneliness well.",
      zh: "你看起来像那种一出场就能把气氛拉起来的现充学妹，笑得很自然，接话也很快，好像天生就知道怎么和所有人打成一片。但熟一点才会发现，你的外向更像一层练出来的壳：会活跃气氛，懂得装没事，也懂得把真正的孤独藏好。属于“第一眼像社交王者，第二眼发现其实是高攻低防独处玩家”的类型。"
    }
  },
  {
    id: "izumi-konata",
    name: {
      en: "Konata Izumi",
      zh: "泉此方"
    },
    source: {
      en: "Lucky Star",
      zh: "幸运星"
    },
    type: "ENTP",
    vector: {
      expression: 0.53,
      temperature: 0.27,
      judgement: 0,
      order: -0.53,
      agency: 0.27,
      aura: 0.53
    },
    traits: {
      en: [
        "Anime Density Over Limit",
        "Friend-Group Commentator",
        "Fast Brain"
      ],
      zh: [
        "二次元浓度超标",
        "熟人圈吐槽役",
        "脑子转得快"
      ]
    },
    matchCopy: {
      en: "You may not be the most diligent person in real life, but in your favorite meme zones, anime zones, and game zones, you instantly shift into high-speed mode. You are not a classic social butterfly; you are the agile commentator of a familiar friend group, fast-reacting, meme-dense, and able to redirect any topic into anime within three steps.",
      zh: "你像那种在现实里未必最勤快，但在自己熟悉的梗区、番区和游戏区里会瞬间切到高速模式的人。你不是传统社牛，更像熟人局里的高机动吐槽役，反应快、梗密度高、还很会把任何话题三步之内拐进二次元。属于“看着有点摆，其实只是把性能全点在喜欢的地方”的类型。"
    }
  },
  {
    id: "jia-ran",
    name: {
      en: "Diana",
      zh: "嘉然"
    },
    source: {
      en: "A-SOUL",
      zh: "A-SOUL"
    },
    type: "ENFP",
    vector: {
      expression: 0.57,
      temperature: 0.57,
      judgement: -0.19,
      order: -0.19,
      agency: 0.38,
      aura: 0.38
    },
    traits: {
      en: [
        "Petite Nuke",
        "Eating Stream Icon",
        "\"Internet's Adopted Daughter\""
      ],
      zh: [
        "小小只核弹",
        "吃饭直播都封神",
        "互联网女儿实锤"
      ]
    },
    matchCopy: {
      en: "Your greatest ability isn\\'t being cute — it\\'s weaponizing cuteness at high frequency. Everyone else does cute as a mood; you do cute as output. The moment she speaks, the chat floods with \"Ranan my Ranan\" even if she\\'s just reading an ad. Insulin recommended.",
      zh: "你最大的能力不是可爱，是把可爱做成高频武器。别人卖萌是一种状态，你卖萌是一种生产力——她一开口，弹幕自动变成「然然我的然然」，哪怕她只是在念广告词。建议备好胰岛素，甜度超标。"
    }
  },
  {
    id: "kagamine-rin",
    name: {
      en: "Kagamine Rin",
      zh: "镜音铃"
    },
    source: {
      en: "VOCALOID",
      zh: "VOCALOID"
    },
    type: "ESFP",
    vector: {
      expression: 0.57,
      temperature: 0.19,
      judgement: -0.19,
      order: -0.38,
      agency: 0.57,
      aura: 0.38
    },
    traits: {
      en: [
        "Orange Maniac",
        "Steamroller Warning",
        "Bouncing Off the Walls Daily"
      ],
      zh: [
        "橘子狂魔",
        "压路机警告",
        "三天不打上房揭瓦"
      ]
    },
    matchCopy: {
      en: "You thought she was just an energetic girl who could act cute, but if you push her too far, she can drive a road roller right over your face. Her vitality is not here to heal you; it is here to torment you. A classic case of \"if I am not embarrassed, you are the one who suffers.\" Carry oranges for survival.",
      zh: "你以为她只是个会卖萌的元气少女，其实惹急了她能开着压路机从你脸上碾过去。她的活力不是用来治愈你的，是用来折腾你的——属于「只要我不尴尬，头疼的就是你」的典型。建议随身携带橘子保命。"
    }
  },
  {
    id: "kaguya-chojikuu",
    name: {
      en: "Kaguya",
      zh: "辉夜"
    },
    source: {
      en: "Cho-Kaguyahime!",
      zh: "超时空辉夜姬！"
    },
    type: "INFJ",
    vector: {
      expression: 0,
      temperature: 0.23,
      judgement: 0.46,
      order: 0.23,
      agency: 0.46,
      aura: 0.69
    },
    traits: {
      en: [
        "Virtual Space Manager",
        "Top Streamer",
        "High-Concept AI"
      ],
      zh: [
        "虚拟空间管理人",
        "顶流主播",
        "高概念AI"
      ]
    },
    matchCopy: {
      en: "You have a strong presence, yet you do not place your emotions plainly on your face. You seem a little distant from everyone, like a virtual idol or divine NPC suspended above the crowd, but you are always quietly watching how people create and shine. You look like a high-concept, cool figure, while deep down you care whether the whole world is running freely and vividly enough.",
      zh: "你像那种存在感很高、却不会把情绪直接摊在脸上的人。你看起来离大家有点远，像悬在高处的虚拟偶像或神明 NPC，但实际上又一直在默默看着每个人怎么创作、怎么发光。属于“表面像高位冷感设定怪，底层其实很在意整个世界运转得够不够自由热闹”的类型。"
    }
  },
  {
    id: "kaltsit",
    name: {
      en: "Kal'tsit",
      zh: "凯尔希"
    },
    source: {
      en: "Arknights",
      zh: "明日方舟"
    },
    type: "INTJ",
    vector: {
      expression: -0.31,
      temperature: -0.16,
      judgement: 0.47,
      order: 0.47,
      agency: 0.47,
      aura: 0.47
    },
    traits: {
      en: [
        "Cold-Faced Doctor",
        "High-Pressure Medical Leader",
        "Mon3tr Launcher"
      ],
      zh: [
        "冷面医生",
        "高压医嘱系领导",
        "Mon3tr发射器"
      ]
    },
    matchCopy: {
      en: "You are not simply cold. You have already calculated the situation, risks, casualties, and backup plans. On the surface, you are the most intimidating doctor in the medical room, speaking in orders or prescriptions with emotions as steady as stone. But when the endgame arrives, you shoulder responsibility, promises, and everyone's lives at once.",
      zh: "你不是单纯高冷，你只是已经把局势、风险、伤亡和后手全算过一遍了。表面像医务室里最不好惹的那位主任，开口不是命令就是医嘱，情绪稳定得像根本不会波动；但真到残局，她又会把责任、承诺和所有人的命一起扛起来。属于「嘴上像在给你下最后通牒，实际上已经把你从灭团线拽回来了」的类型。"
    }
  },
  {
    id: "kaname-madoka",
    name: {
      en: "Madoka Kaname",
      zh: "鹿目圆"
    },
    source: {
      en: "Puella Magi Madoka Magica",
      zh: "魔法少女小圆"
    },
    type: "INFJ",
    vector: {
      expression: 0,
      temperature: 0.58,
      judgement: 0.38,
      order: 0.19,
      agency: 0.38,
      aura: 0.58
    },
    traits: {
      en: [
        "Gentle Nuke",
        "Madoka System Boot",
        "Became a Concept Deity at End"
      ],
      zh: [
        "温柔核弹",
        "圆神启动",
        "最后变成概念神"
      ]
    },
    matchCopy: {
      en: "At first, you think she is a soft girl who needs protection. Later, you realize she rewrote the rules herself. This is not growth; it is an operating system upgrade, from magical girl to cosmic patch in one reboot. Prepare tissues and emergency medicine before watching.",
      zh: "前期以为她是需要保护的软妹，后期发现她直接给自己写了新规则。她不是成长，她是操作系统升级——从「魔法少女」到「宇宙补丁」，一键重启。建议观看时备好纸巾和速效救心丸。"
    }
  },
  {
    id: "kasugano-sora",
    name: {
      en: "Sora Kasugano",
      zh: "春日野穹"
    },
    source: {
      en: "Yosuga no Sora",
      zh: "缘之空"
    },
    type: "INFP",
    vector: {
      expression: -0.54,
      temperature: 0.18,
      judgement: -0.36,
      order: -0.54,
      agency: -0.36,
      aura: 0.36
    },
    traits: {
      en: [
        "Internet Drifter",
        "Black Rabbit Plush Core",
        "Maximum Guard"
      ],
      zh: [
        "网络冲浪达人",
        "黑兔布偶本体",
        "防备心拉满"
      ]
    },
    matchCopy: {
      en: "Usually she appears as a quiet, frail shut-in with a black rabbit plush, using coldness and thorny words to hide deep insecurity. She has no interest in ordinary social life, but once every defense is lowered, her desperate, almost suffocating dependence can break every worldly rule. An extremely pure type who can abandon the world once she chooses you.",
      zh: "平时是一副沉默寡言、带着黑兔布偶的病弱宅女模样，习惯用冷漠和带刺的语言掩饰内心的极度不安。她对外界的社交毫无兴趣，但在卸下所有心防后，那份不顾一切、几乎令人窒息的依赖感足以打破所有世俗的常规。属于「只要认定你，连世界都可以不要」的极端纯粹型。"
    }
  },
  {
    id: "kato-megumi",
    name: {
      en: "Megumi Kato",
      zh: "加藤惠"
    },
    source: {
      en: "Saekano: How to Raise a Boring Girlfriend",
      zh: "路人女主的养成方法"
    },
    type: "ISTP",
    vector: {
      expression: -0.5,
      temperature: 0,
      judgement: 0.25,
      order: 0.25,
      agency: 0.25,
      aura: -0.75
    },
    traits: {
      en: [
        "No Presence",
        "Official Straight Man",
        "Quietly Changes Everything"
      ],
      zh: [
        "毫无存在感",
        "官方吐槽役",
        "润物细无声"
      ]
    },
    matchCopy: {
      en: "At first meeting, you may not even remember her face, as if she comes with optical camouflage. She has no obvious emotional extremes or flashy anime traits, yet when everyone else is locked in chaos, she can deliver the deadliest line in the calmest voice. You thought she was a background character; she is actually the only god holding the script.",
      zh: "初见时你甚至记不住她的脸，仿佛自带光学隐形迷彩。没有明显的喜怒哀乐，没有夸张的二次元属性，但就是能在所有人打得不可开交时，用最平淡的语气抛出最致命的吐槽。你以为她是路人，其实她是捏着剧本的唯一真神。"
    }
  },
  {
    id: "kinomoto-sakura",
    name: {
      en: "Sakura Kinomoto",
      zh: "木之本樱"
    },
    source: {
      en: "Cardcaptor Sakura",
      zh: "魔卡少女樱"
    },
    type: "ENFJ",
    vector: {
      expression: 0.58,
      temperature: 0.58,
      judgement: 0.19,
      order: 0,
      agency: 0.38,
      aura: 0.38
    },
    traits: {
      en: [
        "Definitely All Right",
        "Clow Card Worker",
        "Invincible Gentleness"
      ],
      zh: [
        "绝对没问题的",
        "库洛牌打工妹",
        "无敌的温柔"
      ]
    },
    matchCopy: {
      en: "The original moe queen, and her \"Everything will definitely be all right\" is the ultimate spell against mental exhaustion. Your greatest strength is not simple cheerfulness, but the way you carry complicated things forward with natural sincerity. When others think something is troublesome, you act first; when others are afraid, you gently hold up the atmosphere.",
      zh: "初代萌王，她的那句「絶対、大丈夫だよ」堪称能治愈一切精神内耗的终极咒语。你最大的优点不是单纯开朗，而是总能带着一点天然和真诚把复杂的事也往前推。别人觉得麻烦时，你会先上手；别人害怕时，你反而会用很轻的方式把气氛托住。属于「像春天一样看着软，实际非常能打」的类型。"
    }
  },
  {
    id: "kita-ikuyo",
    name: {
      en: "Ikuyo Kita",
      zh: "喜多郁代"
    },
    source: {
      en: "Bocchi the Rock!",
      zh: "孤独摇滚！"
    },
    type: "ESFJ",
    vector: {
      expression: 0.49,
      temperature: 0.49,
      judgement: -0.16,
      order: -0.16,
      agency: 0.49,
      aura: 0.49
    },
    traits: {
      en: [
        "Kita Beam",
        "Runaway Guitarist",
        "Social Terrorist"
      ],
      zh: [
        "喜多光线",
        "逃跑吉他手",
        "社交恐怖分子"
      ]
    },
    matchCopy: {
      en: "As long as she stands there, the area automatically gains a blinding extrovert filter. Her social ability is maxed out; she can become friends with anyone in three seconds, making her both a natural enemy and a salvation for socially anxious people. She once bought the wrong bass and fled, but when she smiles, you have no choice but to forgive her.",
      zh: "只要她站在那里，周围就会自动生成闪瞎眼的「阳角滤镜」。交际能力点满，能在三秒内和任何人称兄道弟，堪称社恐患者的天然天敌与救赎。虽然有过买错贝斯就提桶跑路的黑历史，但只要她一笑，你就只能原谅她了。"
    }
  },
  {
    id: "kitashirakawa-tamako",
    name: {
      en: "Tamako Kitashirakawa",
      zh: "北白川玉子"
    },
    source: {
      en: "Tamako Market",
      zh: "玉子市场"
    },
    type: "ESFJ",
    vector: {
      expression: 0.46,
      temperature: 0.69,
      judgement: 0,
      order: 0.23,
      agency: 0.46,
      aura: 0.23
    },
    traits: {
      en: [
        "Mochi Brain",
        "Max-Level Airhead",
        "Fat Bird Keeper"
      ],
      zh: [
        "年糕脑",
        "天然呆满级",
        "肥鸟饲养员"
      ]
    },
    matchCopy: {
      en: "The shopping street's favorite girl has mochi on the brain and is so carefree that she cannot even notice when someone likes her. Her completely unguarded airheadedness can easily turn any tense atmosphere into soft daily life. Her motto might be: there is nothing one bite of mochi cannot solve.",
      zh: "满脑子都是年糕的商店街团宠，神经大条到连别人对自己的喜欢都察觉不到。她那种毫无防备的天然呆属性，能轻易把任何紧张的气氛化解成软糯的日常。名言大概是：没有什么事情是吃一口年糕解决不了的！"
    }
  },
  {
    id: "kousaka-kirino",
    name: {
      en: "Kirino Kousaka",
      zh: "高坂桐乃"
    },
    source: {
      en: "Oreimo",
      zh: "我的妹妹哪有这么可爱！"
    },
    type: "ESTJ",
    vector: {
      expression: 0.54,
      temperature: 0.18,
      judgement: 0.36,
      order: 0.36,
      agency: 0.54,
      aura: 0.36
    },
    traits: {
      en: [
        "Little-Sister Archetype",
        "Textbook Tsundere",
        "Meruru Fanatic"
      ],
      zh: [
        "妹系鼻祖",
        "教科书级傲娇",
        "梅露露狂热粉"
      ]
    },
    matchCopy: {
      en: "Outside, she is a perfect model with top grades and athletic ability. At home, she is the ultimate otaku who forces her brother to play little-sister games. Her tsundere side is not a bonus trait; it is the core. She may say \"gross,\" while her heart is already shaking violently. A danger-zone dancer who takes enormous patience to route.",
      zh: "在外面是成绩运动全能的完美模特，在家里是会逼着老哥玩妹系游戏的究极宅女。她的傲娇不是加分项，而是本体——嘴上骂着「恶心」，实际心里可能已经在疯狂动摇。属于那种需要极大耐心才能攻略的“雷区舞者”。"
    }
  },
  {
    id: "kusanagi-nene",
    name: {
      en: "Nene Kusanagi",
      zh: "草薙宁宁"
    },
    source: {
      en: "Project Sekai",
      zh: "世界计划"
    },
    type: "INTP",
    vector: {
      expression: -0.73,
      temperature: -0.24,
      judgement: 0.49,
      order: -0.24,
      agency: 0.24,
      aura: 0.24
    },
    traits: {
      en: [
        "Gloomy Corner Earthbound Spirit",
        "Online Heavy Hitter",
        "Offline Timid Mode"
      ],
      zh: [
        "阴暗角落地缚灵",
        "线上重拳出击",
        "线下唯唯诺诺"
      ]
    },
    matchCopy: {
      en: "In real life, she is severely socially anxious and wants to disappear into a crack in the ground whenever she sees strangers. Give her a controller or keyboard, though, and she instantly becomes a sharp-tongued output machine that leaves opponents lost. When she stands on the stage she truly loves, her piercing singing voice shines so brightly that people cannot look away.",
      zh: "现实中是个严重社恐、看到生人就想找地缝钻进去的自闭少女；但只要给她一个手柄或键盘，马上化身为毒舌输出机，喷得对手找不着北。然而只要站上她真正热爱的舞台，那份极具穿透力的歌声又会耀眼得让人移不开视线。"
    }
  },
  {
    id: "kushima-kamome",
    name: {
      en: "Kamome Kushima",
      zh: "久岛鸥"
    },
    source: {
      en: "Summer Pockets",
      zh: "Summer Pockets"
    },
    type: "ENFP",
    vector: {
      expression: 0.52,
      temperature: 0.52,
      judgement: 0.26,
      order: -0.26,
      agency: 0.52,
      aura: 0.26
    },
    traits: {
      en: [
        "Treasure Map Holder",
        "Suitcase Full of Secrets",
        "Once More to the Pirate Ship"
      ],
      zh: [
        "藏宝图持有者",
        "行李箱里是秘密",
        "再一次向海盗船出发"
      ]
    },
    matchCopy: {
      en: "A mysterious girl wanders the island with a large suitcase and an old treasure map in hand. She is free-spirited yet mature, and she likes triangular sweets. She says she is looking for a place where a pirate ship can dock, but she will never tell anyone what is inside the suitcase. Behind \"Let's set out once more, toward the place with the pirate ship\" lies a summer story about friendship and farewell.",
      zh: "拉着大行李箱在岛上徘徊的神秘少女，手里拿着一张陈旧的藏宝图。性格自由奔放又带着成熟的气质，喜欢三角形的甜点。她说自己在寻找海盗船停泊的地方，但行李箱里到底装着什么，她绝对不会告诉任何人。那句「出发吧，再一次，向着那有海盗船的地方」背后，藏着一个关于友情与告别的夏日故事。"
    }
  },
  {
    id: "luo-tianyi",
    name: {
      en: "Luo Tianyi",
      zh: "洛天依"
    },
    source: {
      en: "Vsinger",
      zh: "Vsinger"
    },
    type: "ISFP",
    vector: {
      expression: 0.25,
      temperature: 0.75,
      judgement: -0.25,
      order: 0,
      agency: 0.25,
      aura: 0.5
    },
    traits: {
      en: [
        "\"World's Biggest Foodie\"",
        "Lucky Koi Spirit",
        "Healing Electronic Vocals"
      ],
      zh: [
        "世界第一大吃货",
        "锦鲤附体",
        "治愈系电音"
      ]
    },
    matchCopy: {
      en: "On the surface, she is a gentle fairy whose singing can heal hearts. Behind the scenes, she is a super glutton capable of eating a production crew into bankruptcy. Her greatest superpower is not hitting high notes, but the astonishing momentum she shows when food is involved. A pure creature whose rule is: everything is fine once she is full.",
      zh: "表面上是个能用歌声治愈人心的温柔仙女，背地里却是个能把剧组吃破产的超级大胃王。她最大的超能力不是飙高音，而是在干饭时展现出的惊人行动力。属于「只要吃饱了就什么都好说」的纯粹生物。"
    }
  },
  {
    id: "matikanetannhauser",
    name: {
      en: "Matikanetannhauser",
      zh: "待兼诗歌剧"
    },
    source: {
      en: "Uma Musume Pretty Derby",
      zh: "赛马娘 Pretty Derby"
    },
    type: "ENFP",
    vector: {
      expression: 0.6,
      temperature: 0.6,
      judgement: -0.2,
      order: -0.2,
      agency: 0.2,
      aura: 0.4
    },
    traits: {
      en: [
        "Mambo Meme Queen",
        "Comedy Relief",
        "Abstract Vibe Setter"
      ],
      zh: [
        "曼波梗王",
        "喜剧役",
        "抽象气氛组"
      ]
    },
    matchCopy: {
      en: "You radiate a kind of happiness pollution that makes it impossible to take anything seriously. Even if you just show up normally, your brain wiring is so entertaining that you somehow drag the entire room's vibe sideways. You're \"not reliable in the traditional sense, but absolutely the most unforgettable one.\"",
      zh: "你身上有一种很难严肃起来的快乐污染力。哪怕本来只是普通地出现一下，也会因为脑回路太有节目效果，莫名把整个场子的气氛带歪。属于“不是传统意义上的靠谱，但一定是最难忘的那个”的类型。"
    }
  },
  {
    id: "misumi-uika",
    name: {
      en: "Uika Misumi / Doloris",
      zh: "三角初华 / Doloris"
    },
    source: {
      en: "BanG Dream! Ave Mujica",
      zh: "BanG Dream! Ave Mujica"
    },
    type: "INFJ",
    vector: {
      expression: 0,
      temperature: 0.26,
      judgement: 0.26,
      order: 0,
      agency: 0.52,
      aura: 0.77
    },
    traits: {
      en: [
        "White Moonlight Illusion",
        "Something Feels Off",
        "\"Even She Doesn't Know Her Next Move\""
      ],
      zh: [
        "白月光假象",
        "越看越不对劲",
        "自己也不知道下一步"
      ]
    },
    matchCopy: {
      en: "First impression: \"probably easy to get along with.\" Real danger: even you don\\'t fully know what you\\'ll do next. A gentle timed explosive. Approach with caution unless you enjoy being surprised.",
      zh: "你给人的第一印象是「应该很好相处」，但真正危险的地方在于：你自己也未必完全知道自己下一步会做什么——属于「温柔型不定时炸弹」。建议远离，除非你享受被炸的刺激。"
    }
  },
  {
    id: "miyazono-kaori",
    name: {
      en: "Kaori Miyazono",
      zh: "宫园薰"
    },
    source: {
      en: "Your Lie in April",
      zh: "四月是你的谎言"
    },
    type: "ENFP",
    vector: {
      expression: 0.39,
      temperature: 0.59,
      judgement: -0.2,
      order: -0.39,
      agency: 0.39,
      aura: 0.39
    },
    traits: {
      en: [
        "Friend A's Calamity",
        "Score-Tearing Maniac",
        "Tearjerker Machine"
      ],
      zh: [
        "友人A的劫难",
        "撕毁乐谱的狂徒",
        "泪目制造机"
      ]
    },
    matchCopy: {
      en: "You're like an uncatchable spring breeze, barging into someone's black-and-white world and forcibly painting it in color. You never play by the rules, treating every performance as if it's the last carnival of your life. You left everyone with the most unforgettable spring, yet chose to remain nothing more than a willful \"liar.\"",
      zh: "你就像一阵无法捕捉的春风，蛮横地闯入别人的黑白世界并强行涂上色彩。你不按规矩出牌，把每一次登台都当成生命的最后一次狂欢。你给所有人留下了最刻骨铭心的春天，自己却只愿意当一个任性的「骗子」。"
    }
  },
  {
    id: "mortis",
    name: {
      en: "Mortis",
      zh: "Mortis"
    },
    source: {
      en: "BanG Dream! Ave Mujica",
      zh: "BanG Dream! Ave Mujica"
    },
    type: "INTJ",
    vector: {
      expression: -0.33,
      temperature: -0.33,
      judgement: 0.5,
      order: 0.17,
      agency: 0.5,
      aura: 0.5
    },
    traits: {
      en: [
        "Personality Switch Energy",
        "Oppressive Entrances",
        "Speaks in Non-Human Mode"
      ],
      zh: [
        "人格切换感",
        "压迫性登场",
        "不说人话式表达"
      ]
    },
    matchCopy: {
      en: "This isn't mere quietness — it's like locking your real emotions inside another stage shell. You come across as a variable that could rewrite the entire atmosphere at any moment: restrained, unfamiliar, and carrying a distinctly aggressive silhouette.",
      zh: "这不是单纯的安静，而是像把真实情绪锁进另一个舞台壳里。你给人的感觉更像一个随时会改写氛围的变量，克制、陌生，而且带着明确的攻击性轮廓。"
    }
  },
  {
    id: "murasame",
    name: {
      en: "Murasame",
      zh: "丛雨"
    },
    source: {
      en: "Senren * Banka",
      zh: "千恋＊万花"
    },
    type: "ENFP",
    vector: {
      expression: 0.64,
      temperature: 0.43,
      judgement: 0,
      order: -0.21,
      agency: 0.43,
      aura: 0.43
    },
    traits: {
      en: [
        "Ghost-Phobic Sword Spirit",
        "500-Year-Old Entity",
        "One Tease and She Breaks"
      ],
      zh: [
        "怕鬼的刀灵",
        "五百年老灵体",
        "一逗就破防"
      ]
    },
    matchCopy: {
      en: "You're the type who puts on a big elder act normally but blushes and crumbles faster than anyone when things get real. Always boasting about your vast life experience, but the second anything spooky shows up, you're retreating to your safe zone. The type who \"wants to be a guardian deity but actually needs way more protecting than anyone else.\"",
      zh: "你像那种平时会把长辈架子端得很足、关键时刻却比谁都容易脸红破防的人。嘴上总说自己见多识广，真碰上灵异和惊吓环节又会瞬间缩回安全区。属于“明明想当保护别人的神明，结果更需要别人护着”的类型。"
    }
  },
  {
    id: "myrtle",
    name: {
      en: "Myrtle",
      zh: "桃金娘"
    },
    source: {
      en: "Arknights",
      zh: "明日方舟"
    },
    type: "ENFP",
    vector: {
      expression: 0.69,
      temperature: 0.46,
      judgement: 0.23,
      order: 0,
      agency: 0.23,
      aura: 0.46
    },
    traits: {
      en: [
        "131cm of Leadership",
        "Durin's Sober Exception",
        "Serial ID Badge Loser"
      ],
      zh: [
        "131cm的统率力",
        "杜林族清醒担当",
        "工牌失踪案当事人"
      ]
    },
    matchCopy: {
      en: "A vibrant Durin girl who calls herself the \"Great General\" commanding the First Avenue and three shopping streets. At just 131cm tall, her battlefield presence and command skills still blow everyone away. One of the few Durin who doesn't doze off, she's endlessly curious about the surface world. Loves collecting \"treasures\" but can't even keep track of her own ID badge.",
      zh: "充满活力的杜林族女孩，自称统率第一大道及三条商店街的「大将军」。虽然身高只有131cm，但战场上的感染力和指挥水准让人刮目相看。来自地下世界的她，是少数不瞌睡的杜林族，对地上世界充满好奇。喜欢收集「宝物」，但是却连工牌都能弄丢。"
    }
  },
  {
    id: "nagasaki-soyo",
    name: {
      en: "Soyo Nagasaki",
      zh: "长崎爽世"
    },
    source: {
      en: "BanG Dream! It's MyGO!!!!!",
      zh: "BanG Dream! It's MyGO!!!!!"
    },
    type: "ISFJ",
    vector: {
      expression: 0,
      temperature: 0.23,
      judgement: 0.69,
      order: 0.46,
      agency: 0.23,
      aura: 0.46
    },
    traits: {
      en: [
        "Presentable Surface Internal Storm",
        "Subtext Level 10 Scholar",
        "Apology Makes You Self-Reflect for 3 Days"
      ],
      zh: [
        "表面体面内心风暴",
        "话里有话十级学者",
        "道歉让你自我反省三天"
      ]
    },
    matchCopy: {
      en: "You look like the person best at caring for others, but you are actually best at saying things that echo painfully afterward. She did not scold you, yet you are already kneeling before the keyboard reflecting on life. A tactical master among smiling tigers. Buy insurance before getting close.",
      zh: "你看起来最会照顾人，其实最会把话说得让人后劲很大。她没骂你，但你已经跪在键盘前反思人生——属于「笑面虎中的战术大师」。建议交往前先买好保险。"
    }
  },
  {
    id: "nakano-azusa",
    name: {
      en: "Azusa Nakano",
      zh: "中野梓"
    },
    source: {
      en: "K-ON!",
      zh: "轻音少女"
    },
    type: "ISTJ",
    vector: {
      expression: -0.24,
      temperature: 0.24,
      judgement: 0.49,
      order: 0.73,
      agency: 0.24,
      aura: 0.24
    },
    traits: {
      en: [
        "Azu-nyan",
        "Easily Swayed",
        "Club's Only Sane Person"
      ],
      zh: [
        "梓喵",
        "容易被忽悠",
        "轻音部唯一的常识人"
      ]
    },
    matchCopy: {
      en: "The sole voice of reason and order in the Light Music Club. She's always going on about \"we need to practice properly,\" but the moment her seniors offer her cake or slap cat ears on her, she's blushing and completely conquered. The quintessential \"mouth says no, body says yes\" earnest underclassman — maximum bullyability score.",
      zh: "轻音部里唯一的常识人和秩序守护者，平时总把“要好好练习”挂在嘴边，但只要学姐们递上一块蛋糕、套上猫耳，马上就会满脸通红地沦陷。属于典型的“嘴上说着不要，身体却很诚实”的认真型学妹，好欺负程度满分。"
    }
  },
  {
    id: "neuro-sama",
    name: {
      en: "Neuro-sama",
      zh: "Neuro-sama"
    },
    source: {
      en: "VTuber",
      zh: "虚拟主播"
    },
    type: "ENTP",
    vector: {
      expression: 0.58,
      temperature: 0,
      judgement: 0.19,
      order: -0.38,
      agency: 0.58,
      aura: 0.38
    },
    traits: {
      en: [
        "AI Mouthpiece Self-Propelled Cannon",
        "Show Effect Auto-Generated",
        "Soft Exterior High-Frequency Misfire Core"
      ],
      zh: [
        "AI嘴替自走炮",
        "节目效果全自动生成",
        "可爱外壳下的高频偏航"
      ]
    },
    matchCopy: {
      en: "You are not just messing around; you are doing probability gacha. Wrapped in a harmless, soft, cute shell, your core is a scrambled launcher that makes even the director sweat. Once you start speaking, even in the most natural tone, you can quietly steer the whole room off course into the Pacific.",
      zh: "你不是在整活，而是在做概率学抽卡。披着人畜无害的软萌外皮，核心却是个连导播都捏一把汗的乱序发射器。一旦你开口，哪怕语气再自然，也能神不知鬼不觉地把场子带偏到太平洋去。"
    }
  },
  {
    id: "nishikigi-chisato",
    name: {
      en: "Chisato Nishikigi",
      zh: "锦木千束"
    },
    source: {
      en: "Lycoris Recoil",
      zh: "莉可丽丝"
    },
    type: "ENFP",
    vector: {
      expression: 0.47,
      temperature: 0.47,
      judgement: 0,
      order: -0.32,
      agency: 0.47,
      aura: 0.47
    },
    traits: {
      en: [
        "Dodges Bullets With Her Body",
        "Non-Lethal Cuddles",
        "Sunshine Big Girl Energy"
      ],
      zh: [
        "肉身躲子弹",
        "非致命性贴贴",
        "阳光开朗大女孩"
      ]
    },
    matchCopy: {
      en: "You think she's just a perpetually cheerful café girl who loves getting cozy with everyone, but she's actually a top-tier agent who can dance through a hail of bullets. Her greatest charm is that even while carrying a crushing fate, she still chooses to embrace the world with her brightest smile and rubber bullets. With her, your life will never have a dull moment — only derailments and high-speed chaos.",
      zh: "你以为她只是个成天乐呵呵、喜欢到处贴贴的咖啡店看板娘，实际上她是能在枪林弹雨里跳舞的顶级特工。她最大的魅力在于，哪怕背负着沉重的宿命，依然选择用最明媚的笑容和橡胶弹去拥抱世界。和她在一起，你的生活绝对不会有无聊两个字，只有脱轨和狂飙。"
    }
  },
  {
    id: "nukumizu-kaju",
    name: {
      en: "Kaju Nukumizu",
      zh: "温水佳树"
    },
    source: {
      en: "Too Many Losing Heroines!",
      zh: "败犬女主太多了！"
    },
    type: "ISFJ",
    vector: {
      expression: 0,
      temperature: 0.4,
      judgement: 0.4,
      order: 0.6,
      agency: 0.4,
      aura: 0.4
    },
    traits: {
      en: [
        "All-Around Little Sister",
        "Big Brother Highest Priority",
        "Usually Stable as a System Service"
      ],
      zh: [
        "全能妹妹",
        "哥哥优先级最高",
        "平时稳得像系统服务"
      ]
    },
    matchCopy: {
      en: "You usually look like a high-performance little-sister template with every life process optimized: study, housework, and social manners all feel factory-calibrated. But the moment the topic shifts to your brother, your emotional management module instantly overclocks. Normal mode is a perfect UI; the core thread is bound to one person.",
      zh: "你平时像那种已经把生活流程全部优化完毕的高性能妹妹模板，学习、家务、待人接物都像出厂校准过。但只要话题切到哥哥，整个人的情绪管理模块就会瞬间超频。属于“平时是完美UI，核心线程其实全绑在一个人身上”的类型。"
    }
  },
  {
    id: "oyama-mahiro",
    name: {
      en: "Mahiro Oyama",
      zh: "绪山真寻"
    },
    source: {
      en: "Onimai: I'm Now Your Sister!",
      zh: "别当哥哥了！"
    },
    type: "INTP",
    vector: {
      expression: -0.22,
      temperature: 0.22,
      judgement: -0.45,
      order: -0.45,
      agency: -0.67,
      aura: 0.22
    },
    traits: {
      en: [
        "Former Game-Addict NEET",
        "Gender Identity Permanently Offline",
        "Hopeless Otaku"
      ],
      zh: [
        "前世是游戏废人",
        "性别认知持续掉线",
        "无可救药的死宅"
      ]
    },
    matchCopy: {
      en: "You think she's an innocent cute middle schooler, but inside that shell lives a hopelessly unsaveable otaku. From violently resisting at first to eventually going \"actually, being a girl is pretty great,\" she personally demonstrated what it means to have an ultra-passive personality. Her daily ultimate goal is just to curl up in her room playing games, yet she always gets arranged by fate (and her little sister) with terrifying precision.",
      zh: "你以为她是个天真可爱的初中生，其实躯壳里装了个无可救药的死宅。从最开始的疯狂抗拒，到后来的“女孩子真香”，她用亲身经历展示了什么叫极度被动的人格。每天的终极目标只是想缩在房间里打游戏，却总是被命运（和亲妹妹）安排得明明白白。"
    }
  },
  {
    id: "phoebe",
    name: {
      en: "Phoebe",
      zh: "菲比"
    },
    source: {
      en: "Wuthering Waves",
      zh: "鸣潮"
    },
    type: "ISFJ",
    vector: {
      expression: -0.22,
      temperature: 0.67,
      judgement: 0.22,
      order: 0.45,
      agency: 0.22,
      aura: 0.45
    },
    traits: {
      en: [
        "Devout Prayers",
        "Tragic Past",
        "Healing Presence"
      ],
      zh: [
        "虔诚祈祷",
        "悲惨过去",
        "治愈系"
      ]
    },
    matchCopy: {
      en: "Lost both parents in a shipwreck and eventually became a devout cleric in the Hidden Sea Order. She transformed past trauma into gentleness and compassion for the world, embracing all suffering like a tranquil ocean. Just looking at her makes you feel like every bit of restlessness can be healed — your standard \"soul safe harbor.\"",
      zh: "因为船难失去双亲，最终在隐海修会成为一名虔诚的圣职者。她将过去的创伤转化为对世界的温柔与悲悯，像静谧的海洋一般包容着所有的苦难。你看着她，就会觉得一切浮躁都能被治愈——属于标准的「灵魂避风港」。"
    }
  },
  {
    id: "phrolova",
    name: {
      en: "Phrolova",
      zh: "弗洛洛"
    },
    source: {
      en: "Wuthering Waves",
      zh: "鸣潮"
    },
    type: "INTJ",
    vector: {
      expression: -0.36,
      temperature: -0.36,
      judgement: 0.54,
      order: 0.18,
      agency: 0.36,
      aura: 0.54
    },
    traits: {
      en: [
        "Silent Oppression",
        "Dangerous Performer",
        "Utopia Obsession"
      ],
      zh: [
        "安静型压迫感",
        "危险的演奏者",
        "理想世界执念"
      ]
    },
    matchCopy: {
      en: "Your vibe isn't just cold — you're the kind of dangerously quiet presence that makes everyone instinctively shut up the moment you stand at center stage. Your surface emotions are faint, but your core is all control forged from grief and obsession, like someone retuning the entire world to their own pitch.",
      zh: "你给人的感觉不是普通高冷，而是那种会安静站在场中央、却让所有人自动收声的危险存在。表面上情绪很淡，实际内核全是被悲伤和执念拧出来的控制力，像是在重新给世界定调的人。"
    }
  },
  {
    id: "reze",
    name: {
      en: "Reze",
      zh: "雷塞"
    },
    source: {
      en: "Chainsaw Man",
      zh: "电锯人"
    },
    type: "ESTP",
    vector: {
      expression: 0.41,
      temperature: 0.2,
      judgement: 0.2,
      order: 0,
      agency: 0.61,
      aura: 0.61
    },
    traits: {
      en: [
        "Tender Disguise",
        "Mission-Grade Danger",
        "High-Charisma Approach"
      ],
      zh: [
        "温柔伪装",
        "任务型危险感",
        "高魅力接近"
      ]
    },
    matchCopy: {
      en: "Your first impression makes it so easy for people to let their guard down: warm, breezy, great at banter, and skilled at manufacturing that \"finally someone truly sees me\" illusion. But your core isn't easily boxed into romance tropes. Behind much of that warmth lurk missions, tests, and risks — and the most complicated part is that the closeness isn't entirely fake. The type who \"approaches like a summer evening breeze, then flips like the last second of silence before an explosion.\"",
      zh: "你给人的第一感觉往往很容易让人卸下防备：亲近、轻松、会接话，也很会制造那种“终于有人认真看见我了”的错觉。但你的内核并不适合被简单归类成恋爱向滤镜，很多温柔背后都带着任务、试探与风险，而最复杂的地方在于那份靠近又不是全假。属于“接近时像夏夜晚风，翻脸时像爆炸前最后一秒安静”的类型。"
    }
  },
  {
    id: "runami-yachiyo",
    name: {
      en: "Yachiyo Tsukimi",
      zh: "月见八千代"
    },
    source: {
      en: "Cho-Kaguyahime!",
      zh: "超时空辉夜姬！"
    },
    type: "ENFJ",
    vector: {
      expression: 0.45,
      temperature: 0.45,
      judgement: 0.3,
      order: 0.3,
      agency: 0.45,
      aura: 0.45
    },
    traits: {
      en: [
        "8000-Year-Old AI Top Star",
        "Tsukimori Server Admin",
        "Ocean-Type Courtesan Diva"
      ],
      zh: [
        "8000岁AI顶流",
        "月读服务器管理员",
        "海洋系花魁歌姬"
      ]
    },
    matchCopy: {
      en: "You are the kind of person who treats an entire virtual world like a home to care for. On the surface, you are a top performer with perfect stage presence; underneath, you are the cyber white moonlight quietly looking after every passerby. You have strong expressiveness and infectious energy, but what is rare is that you shine not just to be seen, but because you truly care about the place and its people.",
      zh: "你像那种会把整个虚拟世界当家来养的人：表面是营业满分的顶流，实际是偷偷把每个路过的人都照顾到的赛博白月光。你有很强的表达欲和感染力，但真正稀有的地方，是你不是为了被看见才发光，而是因为你真的在意这个场子、在意这里的人，也在意大家能不能玩得开心。"
    }
  },
  {
    id: "sakagami-tomoyo",
    name: {
      en: "Tomoyo Sakagami",
      zh: "坂上智代"
    },
    source: {
      en: "CLANNAD",
      zh: "Clannad"
    },
    type: "ESTJ",
    vector: {
      expression: 0.17,
      temperature: 0.17,
      judgement: 0.52,
      order: 0.52,
      agency: 0.52,
      aura: 0.35
    },
    traits: {
      en: [
        "Hundred-Hit Combo",
        "Town's Strongest Legend",
        "Clumsy Sense of Duty"
      ],
      zh: [
        "连击破百",
        "小镇最强传说",
        "笨拙的责任感"
      ]
    },
    matchCopy: {
      en: "Once the undisputed brawler who dominated the entire town — capable of kicking people into the air and keeping them there — now a serious, responsible student council president who carries everything on her shoulders. Despite her god-tier combat skills, she always shows a clumsy and endearing side in front of the person she loves. A War Empress who shoulders both \"duty\" and \"love\" with iron determination.",
      zh: "曾经是打遍小镇无敌手、能把人踢在半空中下不来的不良少女，现在却是认真负责、背负一切的学生会长。战斗力虽然爆表，但在喜欢的人面前却总是展现出笨拙又惹人怜爱的一面。是一个把“责任”和“爱”都死死扛在肩上的武帝。"
    }
  },
  {
    id: "sakurajima-mai",
    name: {
      en: "Mai Sakurajima",
      zh: "樱岛麻衣"
    },
    source: {
      en: "Rascal Does Not Dream of Bunny Girl Senpai",
      zh: "青春猪头少年不会梦到兔女郎学姐"
    },
    type: "ENTJ",
    vector: {
      expression: 0.19,
      temperature: 0.19,
      judgement: 0.38,
      order: 0.38,
      agency: 0.57,
      aura: 0.57
    },
    traits: {
      en: [
        "Foot-Stomp Reward",
        "Top-Tier Teasing",
        "Textbook Tsundere"
      ],
      zh: [
        "踩脚奖励",
        "顶级拉扯",
        "教科书式傲娇"
      ]
    },
    matchCopy: {
      en: "You think you're flirting with her, but she's been running circles around you on both IQ and EQ the entire time. On the surface, an untouchable, decisive national-class actress; behind the scenes, she'd give everything for the person she loves. Her love is like her sharp tongue — every word hits like a critical strike, yet somehow leaves you addicted to the sweetness.",
      zh: "你以为能撩到她，其实一直被她在智商和情商上疯狂拉扯。表面上是个高不可攀、行事果断的国民级女演员，背地里却能为了喜欢的人付出一切。她的爱就像她的毒舌一样，刀刀致命，又甜得让人上头。"
    }
  },
  {
    id: "shiina-mayuri",
    name: {
      en: "Mayuri Shiina",
      zh: "椎名真由理"
    },
    source: {
      en: "Steins;Gate",
      zh: "命运石之门"
    },
    type: "ENFP",
    vector: {
      expression: 0.61,
      temperature: 0.61,
      judgement: 0,
      order: -0.2,
      agency: 0.2,
      aura: 0.41
    },
    traits: {
      en: [
        "Tuturu♪",
        "Juicy Fried Chicken No.1",
        "Mayuri's Watch Stopped Again"
      ],
      zh: [
        "嘟嘟噜",
        "多汁炸鸡NO.1",
        "真由理的怀表怎么停了"
      ]
    },
    matchCopy: {
      en: "Her very existence is like a gentle anchor — no matter how the worldline shifts, no matter how much chaos the time machine stirs up, she'll smile and give you a \"Tuturu♪\". You're not the type to actively solve problems, but you have a magical ability: as long as you're around, everyone feels like \"maybe it's not so bad after all.\" The type who \"looks the weakest but is actually holding up the entire team's mental health.\"",
      zh: "她的存在本身就像一个温柔的锚点——不管世界线怎么变动、不管时间机器把一切搅得多乱，她都会笑着对你说一句「嘟嘟噜」。你不是那种会主动解决问题的人，但你有一种神奇的能力：只要你在，周围的人就会觉得「好像也没那么糟」。属于「看起来最柔弱，实际上撑住了整个团队精神状态」的类型。"
    }
  },
  {
    id: "shiina-taki",
    name: {
      en: "Taki Shiina",
      zh: "椎名立希"
    },
    source: {
      en: "BanG Dream! It's MyGO!!!!!",
      zh: "BanG Dream! It's MyGO!!!!!"
    },
    type: "ESTJ",
    vector: {
      expression: 0.39,
      temperature: 0.2,
      judgement: 0.39,
      order: 0.59,
      agency: 0.39,
      aura: 0.39
    },
    traits: {
      en: [
        "Walking Powder Keg",
        "Workaholic Demon",
        "Says Annoying Actually Does Everything"
      ],
      zh: [
        "火药桶本体",
        "加班狂魔",
        "嘴上说烦实际全包"
      ]
    },
    matchCopy: {
      en: "Your character keyword is \"don\\'t push me, but I\\'ll handle it anyway.\" Aggressive exterior, core of pure responsibility — just expressed like a stick of dynamite. Explodes, then helps clean up the aftermath. Keep a fire extinguisher nearby.",
      zh: "你的人设关键词叫「别惹我，但我其实会管你」。外表是攻击性，内核是责任感，只是表达方式比较像炸药包——炸完还帮你收拾残局。建议常备灭火器。"
    }
  },
  {
    id: "shirai-kuroko",
    name: {
      en: "Kuroko Shirai",
      zh: "白井黑子"
    },
    source: {
      en: "A Certain Scientific Railgun",
      zh: "某科学的超电磁炮"
    },
    type: "ESTJ",
    vector: {
      expression: 0.45,
      temperature: 0.3,
      judgement: 0.45,
      order: 0.45,
      agency: 0.45,
      aura: 0.3
    },
    traits: {
      en: [
        "Onee-Sama Simp No.1",
        "Teleport Level 4",
        "Ojou-Sama Speech ~desu no"
      ],
      zh: [
        "姐姐大人单推人",
        "空间移动 Level 4",
        "大小姐敬语～ですの"
      ]
    },
    matchCopy: {
      en: "You think she's just a \"Onee-sama\"-screaming fangirl, but she's actually Tokiwadai's only Level 4 Teleporter and Academy City's iron-willed Judgment officer. She perfectly fuses two diametrically opposite traits — \"overheating for Onee-sama\" and \"absolute sense of justice\" — switching between professional efficiency and instant obsession faster than her own teleportation.",
      zh: "你以为她只是个每天高呼「姐姐大人」的痴汉，但其实她是常盘台唯一的 Level 4 空间移动能力者兼学园都市治安维护铁血风纪委员。她把「对姐姐大人过热」和「绝对的正义感」这两种截然相反的属性完美融合——工作时雷厉风行、办案果断，一旦切到姐姐大人频道就立刻系统超频。属于「公务模式和感情模式切换速度比空间移动还快」的典范。"
    }
  },
  {
    id: "shorekeeper",
    name: {
      en: "Shorekeeper",
      zh: "守岸人"
    },
    source: {
      en: "Wuthering Waves",
      zh: "鸣潮"
    },
    type: "INFJ",
    vector: {
      expression: -0.37,
      temperature: 0,
      judgement: 0.55,
      order: 0.37,
      agency: 0.37,
      aura: 0.55
    },
    traits: {
      en: [
        "Only Has Eyes for You",
        "Star Seas and Butterflies",
        "AI That Grew Human Feelings"
      ],
      zh: [
        "只注视你一人",
        "星海与蝴蝶",
        "AI生出人类情感"
      ]
    },
    matchCopy: {
      en: "Born from a sea of data, originally just an emotionless observer tasked with maintaining the world's operation — yet grew a soul called \"selfish desire\" simply because you existed. She can calculate the fate and probability of the entire world with perfect clarity, but all her divinity and computation ultimately serve only one purpose: protecting you.",
      zh: "诞生于数据的星海，原本只是个毫无感情、负责维系世界运转的观测者，却因为你的存在而长出了名为“私心”的灵魂。她能把整个世界的命运与概率算得清清楚楚，但她所有的神性与计算，最终都只为保护你这一件事而服务。"
    }
  },
  {
    id: "tachibana-kanade",
    name: {
      en: "Kanade Tachibana",
      zh: "立华奏"
    },
    source: {
      en: "Angel Beats!",
      zh: "Angel Beats!"
    },
    type: "ISTJ",
    vector: {
      expression: -0.47,
      temperature: -0.16,
      judgement: 0.47,
      order: 0.47,
      agency: 0.31,
      aura: 0.47
    },
    traits: {
      en: [
        "Kuudere Angel",
        "Extra-Spicy Mapo Tofu Enthusiast",
        "Hand Sonic"
      ],
      zh: [
        "三无天使",
        "超辣麻婆豆腐党",
        "Hand Sonic"
      ]
    },
    matchCopy: {
      en: "Your first impression is usually quiet, rigid, and hard to approach — like someone who'll enforce the rules to the very end. But the real core isn't coldness; it's that you've long grown used to holding your ground even when nobody understands you. The type whose \"cold exterior is just a shell, while gentleness is always quietly doing the work.\"",
      zh: "你给人的第一印象往往是安静、冷硬、难以靠近，像那种会把规则执行到底的人。但真正的核心并不是冷漠，而是你早就习惯在不被理解的情况下继续守住自己该守的东西。属于“高冷只是外壳，温柔却一直在做事”的类型。"
    }
  },
  {
    id: "takamatsu-tomori",
    name: {
      en: "Tomori Takamatsu",
      zh: "高松灯"
    },
    source: {
      en: "BanG Dream! It's MyGO!!!!!",
      zh: "BanG Dream! It's MyGO!!!!!"
    },
    type: "INFP",
    vector: {
      expression: -0.32,
      temperature: 0.63,
      judgement: 0.32,
      order: 0,
      agency: 0,
      aura: 0.63
    },
    traits: {
      en: [
        "Bandage Collector",
        "Inner Monologue Broadcast System",
        "Fragile but Resilient"
      ],
      zh: [
        "创可贴收集家",
        "内心独白播放器",
        "一碰就碎但很韧"
      ]
    },
    matchCopy: {
      en: "You are not speaking; you are throwing prose poems into the air. Your defining trait is not fragility, but fragility with literary texture. When others cry, it is sadness; when you cry, it becomes performance art. MyGO's designated emotional ATM: please withdraw gently.",
      zh: "你不是在说话，你是在往空气里投掷散文诗。你最大的特点不是脆弱，是脆弱得特别有文学性——别人哭是伤心，你哭是艺术行为。MyGO团内指定「情感ATM」，取款请轻按。"
    }
  },
  {
    id: "tanikaze-amane",
    name: {
      en: "Amane Tanikaze",
      zh: "谷风天音"
    },
    source: {
      en: "Tenshi Souzou RE-BOOT!",
      zh: "天使☆骚动 RE-BOOT!"
    },
    type: "INTP",
    vector: {
      expression: -0.6,
      temperature: 0,
      judgement: 0.3,
      order: -0.6,
      agency: -0.3,
      aura: 0.3
    },
    traits: {
      en: [
        "VTuber Oshi",
        "Online Chatterbox Offline Mute",
        "Born to Surf the Web"
      ],
      zh: [
        "VTuber单推人",
        "线上话痨线下哑巴",
        "互联网冲浪圣体"
      ]
    },
    matchCopy: {
      en: "In the online world, she's an omniscient surf legend fluent in memes and slang; in real life, she's a socially anxious shut-in who withers the moment she leaves her computer. Her entire social battery runs on watching streams and spamming chat. If you try to drag her out of her room, she might literally dissolve on the spot. The ultimate evolved form of a \"digital sea urchin.\"",
      zh: "在网络世界里，她是无所不知、满嘴抽象热词的冲浪巨佬；在现实中，她是个离开电脑就会迅速枯萎的社恐废柴。她的社交能量全靠看直播发弹幕来维持，如果你试图把她从房间里拖出去，她可能会当场融化。属于「电子海胆」的究极进化形态。"
    }
  },
  {
    id: "togawa-sakiko",
    name: {
      en: "Sakiko Togawa",
      zh: "丰川祥子"
    },
    source: {
      en: "BanG Dream! Ave Mujica",
      zh: "BanG Dream! Ave Mujica"
    },
    type: "ENTJ",
    vector: {
      expression: -0.16,
      temperature: -0.16,
      judgement: 0.49,
      order: 0.49,
      agency: 0.49,
      aura: 0.49
    },
    traits: {
      en: [
        "CEO-Level Presence",
        "Boardroom on a Tightrope",
        "\"Leave It to Me\" Default Setting"
      ],
      zh: [
        "CEO级气场",
        "边开会边走钢丝",
        "我说把人生交给我"
      ]
    },
    matchCopy: {
      en: "It's not that you're a control freak — you just genuinely believe everything will fall apart without you. Your mental state is like running a board meeting while sprinting along a cliff edge. Motto: \"Don't ask why — because I AM the rule.\" Keep your distance unless you want to experience being chased by deadlines every single day.",
      zh: "你不是控制欲强，你只是觉得大家离了你都要出事。精神像在开董事会+在悬崖边跑马拉松——名言：「别问为什么，因为我就是规则」。建议远离，除非你想体验每天被Deadline追着跑的感觉。"
    }
  },
  {
    id: "tokai-teio",
    name: {
      en: "Tokai Teio",
      zh: "东海帝皇"
    },
    source: {
      en: "Uma Musume Pretty Derby",
      zh: "赛马娘 Pretty Derby"
    },
    type: "ESFP",
    vector: {
      expression: 0.52,
      temperature: 0.35,
      judgement: 0.17,
      order: -0.17,
      agency: 0.52,
      aura: 0.52
    },
    traits: {
      en: [
        "Honey Special Drink Fanatic",
        "President's #1 Stan",
        "Not Even Fractures Can Stop Her"
      ],
      zh: [
        "蜂蜜特饮狂热粉",
        "会长唯粉",
        "骨折也拦不住"
      ]
    },
    matchCopy: {
      en: "Endlessly energetic, dreaming of becoming an undefeated Triple Crown horse girl like the \"Emperor.\" Even after suffering a career-ending comminuted fracture, she pulled off a miraculous comeback when everyone had written her off. The kind of radiant presence who makes you cheer at the top of your lungs just because she's still running on the track.",
      zh: "永远充满活力，做梦都想成为像“皇帝”一样无败的三冠赛马娘。就算遭遇了足以终结职业生涯的粉碎性骨折，也能在所有人都不看好的绝境中奇迹复活。属于那种“只要她还在场上奔跑，你就会忍不住被她的光芒感染并大声欢呼”的耀眼存在。"
    }
  },
  {
    id: "tokisaki-kurumi",
    name: {
      en: "Kurumi Tokisaki",
      zh: "时崎狂三"
    },
    source: {
      en: "Date A Live",
      zh: "约会大作战"
    },
    type: "INTJ",
    vector: {
      expression: 0.17,
      temperature: -0.35,
      judgement: 0.52,
      order: 0.17,
      agency: 0.52,
      aura: 0.52
    },
    traits: {
      en: [
        "Zafkiel Time Management Master",
        "Yandere Ceiling",
        "Twin Tails Heterochromia"
      ],
      zh: [
        "刻帝时间管理大师",
        "病娇天花板",
        "双马尾异色瞳"
      ]
    },
    matchCopy: {
      en: "The ceiling of yandere who perfectly marries \"elegance\" with \"utterly unhinged.\" You're a master of controlling the scene and the image you project. Externally graceful, well-spoken, even polite — but your true core is never handed over so easily. The type where \"you think she's being flirtatious, but she's probably already pushed the situation three moves ahead.\"",
      zh: "把「优雅」和「疯批」完美结合的病娇界天花板。你很会控制场面，也很会控制自己想给别人看到的样子。外表优雅、说话得体、甚至显得很有礼貌，但真正的核心从来不会随便交出去。属于「你以为她在暧昧，其实她可能已经把局势推到下一阶段了」的类型。"
    }
  },
  {
    id: "tomori-nao",
    name: {
      en: "Nao Tomori",
      zh: "友利奈绪"
    },
    source: {
      en: "Charlotte",
      zh: "Charlotte"
    },
    type: "INTJ",
    vector: {
      expression: -0.19,
      temperature: -0.19,
      judgement: 0.57,
      order: 0.38,
      agency: 0.57,
      aura: 0.38
    },
    traits: {
      en: [
        "Never Without a Camcorder",
        "Student Council Iron Fist",
        "Solo Invisibility"
      ],
      zh: [
        "录像机不离手",
        "学生会铁面执法",
        "单体隐身"
      ]
    },
    matchCopy: {
      en: "You usually come across like a student council enforcement program with the emotion display panel off by default: flat-toned, surgically precise, and not to be messed with. But the real core isn't coldness — it's that you've long habituated yourself to absorbing all the judgment, risk, and responsibility before anyone else has to. The type who \"doesn't love explaining herself, but things genuinely stabilize the moment she takes over.\"",
      zh: "你平时像那种情绪显示面板默认关闭的学生会执法程序，说话淡、下手准、看起来很不好惹。但真正的核心不是冷，而是你已经习惯把判断、风险和责任先一步扛起来。属于“不是特别爱解释自己，但局势交给她确实会稳很多”的类型。"
    }
  },
  {
    id: "tomotake-yoshino",
    name: {
      en: "Yoshino Tomotake",
      zh: "朝武芳乃"
    },
    source: {
      en: "Senren * Banka",
      zh: "千恋＊万花"
    },
    type: "ISTJ",
    vector: {
      expression: -0.21,
      temperature: 0.21,
      judgement: 0.42,
      order: 0.63,
      agency: 0.42,
      aura: 0.42
    },
    traits: {
      en: [
        "Responsibility Overload",
        "Textbook Shrine Maiden Type",
        "Fluffy Things Collector"
      ],
      zh: [
        "责任感超载",
        "古板系巫女",
        "毛茸茸收藏癖"
      ]
    },
    matchCopy: {
      en: "You look like someone who writes rules, responsibility, and order directly into the schedule: restrained on the outside, but hiding a very soft interior. The harder you try to remain proper and composed, the easier it is for close friends to expose your real feelings through a little contrast. You seem hardest to approach, but become the warmest once people know you.",
      zh: "你看起来像那种会把规矩、责任和秩序写进日程表的人，外在克制，内里却藏着很软的一面。平时越想维持端正稳重，越容易在熟人面前因为一点反差萌暴露真实情绪。属于“看着最不好接近，熟了反而最有温度”的类型。"
    }
  },
  {
    id: "uika-nyubara",
    name: {
      en: "Nyubara Uika / Amoris",
      zh: "祐天寺若麦 / Amoris"
    },
    source: {
      en: "BanG Dream! Ave Mujica",
      zh: "BanG Dream! Ave Mujica"
    },
    type: "ENTP",
    vector: {
      expression: 0.69,
      temperature: 0.23,
      judgement: 0,
      order: -0.23,
      agency: 0.46,
      aura: 0.46
    },
    traits: {
      en: [
        "Maximum Business Mode",
        "Social Media Native",
        "Chaos Is Productivity"
      ],
      zh: [
        "营业感拉满",
        "社交媒体原住民",
        "整活就是生产力"
      ]
    },
    matchCopy: {
      en: "You have this modern quality of \"clearly going off-script, but doing it like a pro.\" Switching personas like applying filters, packaging emotional expression into personal branding. Recommended book deal: How to Turn Going Unhinged Into Viral Content.",
      zh: "你有一种「明明在发疯，但发得很会经营」的现代感。人设切换像开滤镜，情绪表达像在给自己的人生做运营——建议出书《如何把发疯变成流量密码》。"
    }
  },
  {
    id: "vertin",
    name: {
      en: "Vertin",
      zh: "维尔汀"
    },
    source: {
      en: "Reverse:1999",
      zh: "重返未来:1999"
    },
    type: "INTP",
    vector: {
      expression: -0.22,
      temperature: -0.22,
      judgement: 0.45,
      order: -0.22,
      agency: 0.67,
      aura: 0.45
    },
    traits: {
      en: [
        "Time Management Master",
        "Storm Immunity",
        "Suitcase Mobile Fortress"
      ],
      zh: [
        "时间管理大师",
        "暴雨免疫体质",
        "手提箱移动堡垒"
      ]
    },
    matchCopy: {
      en: "A \"Timekeeper\" belonging to the St. Pavlov Foundation — not the strongest fighter, but the irreplaceable \"Key.\" A calm and composed young woman who doesn't have many people she can trust. As she's known since she first had memories: she has always been alone.",
      zh: "从活泼少女到沉静的引路人隶属于圣洛夫基金会的“司辰”，不是最强的战士却是不可替代的“钥匙”，冷静沉稳的少女她没有多少可以相信的人。因为自有记忆起，我便很清楚自己是独自一人"
    }
  },
  {
    id: "wakaba-mutsumi",
    name: {
      en: "Mutsumi Wakaba",
      zh: "若叶睦"
    },
    source: {
      en: "BanG Dream! Ave Mujica",
      zh: "BanG Dream! Ave Mujica"
    },
    type: "ISTJ",
    vector: {
      expression: -0.48,
      temperature: -0.32,
      judgement: 0.48,
      order: 0.32,
      agency: 0.32,
      aura: 0.48
    },
    traits: {
      en: [
        "Silent Warhead in a Cucumber Field",
        "One-Liner Iconic Scene Generator",
        "Impossible to Read"
      ],
      zh: [
        "黄瓜田里的沉默核武",
        "一开口就是名场面",
        "你永远猜不透"
      ]
    },
    matchCopy: {
      en: "It is not that you have few emotions; you hide them somewhere others cannot read. Usually you seem like background scenery, yet at key moments you reveal a stubbornness and dull ache that make people uneasy. You are so quiet that people become afraid to look away.",
      zh: "你不是情绪少，你是情绪都藏在别人看不懂的地方。平时像背景板，却总在关键节点露出让人不安的执拗和迟钝感——属于「安静得过头，反而让人不敢移开视线」的类型。"
    }
  },
  {
    id: "yahata-umiri",
    name: {
      en: "Umiri Yahata / Timoris",
      zh: "八幡海铃 / Timoris"
    },
    source: {
      en: "BanG Dream! Ave Mujica",
      zh: "BanG Dream! Ave Mujica"
    },
    type: "ISTJ",
    vector: {
      expression: -0.36,
      temperature: -0.18,
      judgement: 0.54,
      order: 0.54,
      agency: 0.36,
      aura: 0.36
    },
    traits: {
      en: [
        "Minimalist Worker Bee",
        "Few Words Sharp Cuts",
        "Cleanup Specialist"
      ],
      zh: [
        "极简主义打工人",
        "话少刀快",
        "收场专业户"
      ]
    },
    matchCopy: {
      en: "You do not create drama, but you are usually the person most capable of cleaning it up. While everyone else is still fluctuating emotionally, you have already started handling the aftermath. A silent cleanup specialist with frightening stability. Ask her for help when needed; do not bother her when not.",
      zh: "你不制造drama，但你通常是drama里最能收场的人。别人还在情绪波动，你已经开始处理后果了——属于「沉默の清道夫，稳得一批」。建议有事找她，没事别烦她。"
    }
  },
  {
    id: "yamada-ryo",
    name: {
      en: "Ryo Yamada",
      zh: "山田凉"
    },
    source: {
      en: "Bocchi the Rock!",
      zh: "孤独摇滚！"
    },
    type: "INTP",
    vector: {
      expression: -0.5,
      temperature: -0.25,
      judgement: 0.25,
      order: -0.75,
      agency: 0,
      aura: 0.25
    },
    traits: {
      en: [
        "Wallet Permanently Empty",
        "Currently Eating Grass",
        "Deadpan Nonsense Expert"
      ],
      zh: [
        "钱包空空",
        "绝赞吃草中",
        "一本正经地胡说八道"
      ]
    },
    matchCopy: {
      en: "A lone-wolf bassist who secretly rejoices when called \"weird.\" Her life philosophy is intensely self-centered — all money goes to instruments, and when broke, she forages roadside weeds to eat, even shamelessly scamming bandmates out of cash for snacks. You think she's cool and deep, but she just can't be bothered to follow basic human social norms. Pure, elevated, transcendent \"trash.\"",
      zh: "被叫作「怪人」会暗自窃喜的孤高贝斯手。人生哲学极度自我，有钱全砸在乐器上，没钱就拔路边的野草吃，甚至还能面不改色地骗队友的钱买零食。你以为她高冷深沉，其实她只是懒得遵守人类社会的常识。纯粹的、脱离了低级趣味的「屑」。"
    }
  },
  {
    id: "yanami-anna",
    name: {
      en: "Anna Yanami",
      zh: "八奈见杏菜"
    },
    source: {
      en: "Too Many Losing Heroines!",
      zh: "败犬女主太多了！"
    },
    type: "ESFJ",
    vector: {
      expression: 0.64,
      temperature: 0.43,
      judgement: 0,
      order: -0.21,
      agency: 0.43,
      aura: 0.43
    },
    traits: {
      en: [
        "Childhood Friend Loser Slot",
        "Class Popular Kid",
        "Bottomless Appetite"
      ],
      zh: [
        "幼驯染败犬位",
        "班级人气王",
        "食欲深不见底"
      ]
    },
    matchCopy: {
      en: "On the surface, you look like the class favorite who can heat up the mood at any time, but your romance record has already been marked as a loss by the system. You can eat, talk, swallow your hurt, and still pretend everything is fine. The livelier you look, the easier it is for you to quietly disconnect at night.",
      zh: "你表面像那种随时都能把气氛带热的班级门面，实际上恋爱战绩已经被系统提前判负。能吃、能聊、能把难受先咽下去，嘴上还要装得像没事一样。属于“越是看起来活泼，越容易在夜里偷偷掉线”的类型。"
    }
  },
  {
    id: "yo-rana",
    name: {
      en: "Rana Kaname",
      zh: "要乐奈"
    },
    source: {
      en: "BanG Dream! It's MyGO!!!!!",
      zh: "BanG Dream! It's MyGO!!!!!"
    },
    type: "ISTP",
    vector: {
      expression: -0.47,
      temperature: -0.24,
      judgement: 0.47,
      order: -0.24,
      agency: 0.47,
      aura: 0.47
    },
    traits: {
      en: [
        "Logic Offline",
        "Touch-Based Prodigy",
        "Stray Guitarist"
      ],
      zh: [
        "逻辑不联网",
        "手感通天",
        "流浪吉他手"
      ]
    },
    matchCopy: {
      en: "Other people form bands through communication. You form bands by appearing. You are not impossible to understand; you simply cannot be bothered to explain yourself to the world. Just play. Why so many words? Feed with soba and do not force petting.",
      zh: "别人组乐队靠沟通，你组乐队靠「出现」。你不是难懂，你只是懒得向这个世界解释——弹就完了，哪那么多废话。建议饲养时投喂荞麦面，不要强行撸猫。"
    }
  },
  {
    id: "yuigahama-yui",
    name: {
      en: "Yui Yuigahama",
      zh: "由比滨结衣"
    },
    source: {
      en: "My Teen Romantic Comedy SNAFU",
      zh: "我的青春恋爱物语果然有问题"
    },
    type: "ESFJ",
    vector: {
      expression: 0.5,
      temperature: 0.75,
      judgement: 0,
      order: 0.25,
      agency: 0.25,
      aura: 0.25
    },
    traits: {
      en: [
        "Dango Hair",
        "Vibe Guardian",
        "Accommodation Survival Strategy"
      ],
      zh: [
        "团子头",
        "气氛守护者",
        "迎合型生存法"
      ]
    },
    matchCopy: {
      en: "You habitually go along with everyone around you, terrified of disrupting even the slightest bit of group harmony. People think you're a naturally airheaded optimist, but really you've just leveled up \"reading the atmosphere\" into a passive skill. Among this crowd of awkward weirdos, your somewhat clumsy kindness is the only lubricant — though the cost is usually swallowing your own grievances.",
      zh: "你总是习惯性地迎合周围，生怕破坏哪怕一丝群体的平衡。别人以为你是天生的无脑乐天派，其实你只是把「读空气」练成了被动技能。在这群充满别扭怪的人际关系里，你那份有些笨拙的温柔是唯一的润滑剂——虽然代价往往是把委屈留给自己。"
    }
  }
]

const extraPalettes: string[] = [
  'rose',
  'ice',
  'amber',
  'lavender',
  'peach',
  'royal',
  'mint',
  'ruby',
  'sky',
  'honey',
  'midnight',
  'sakura',
  'steel',
  'copper',
  'aqua',
  'violet',
  'bubblegum',
  'gunmetal',
  'forest',
  'wine',
  'electric',
  'sunset',
  'plum',
  'strawberry',
  'pearl',
  'crimson',
  'brass',
  'ocean',
  'indigo',
  'magenta',
]

function clampScore(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

function extraTypeSign(type: WaifuType, axis: Axis): number {
  if (axis === 'E_I') return type[0] === 'I' ? 1 : -1
  if (axis === 'S_N') return type[1] === 'N' ? 1 : -1
  if (axis === 'T_F') return type[2] === 'F' ? 1 : -1
  return type[3] === 'P' ? 1 : -1
}

function extraMagnitude(component: number): number {
  return clampScore(Math.round(52 + Math.abs(component) * 42), 54, 88)
}

function extraAxisVector(entry: ExtraCharacterSource): Record<Axis, number> {
  return {
    E_I: extraTypeSign(entry.type, 'E_I') * extraMagnitude(entry.vector.expression),
    S_N: extraTypeSign(entry.type, 'S_N') * extraMagnitude(entry.vector.aura),
    T_F: extraTypeSign(entry.type, 'T_F') * extraMagnitude(entry.vector.temperature),
    J_P: extraTypeSign(entry.type, 'J_P') * extraMagnitude(entry.vector.order),
  }
}

const extraCharacters: Character[] = extraSourceCharacters.map((entry, index) => ({
  id: entry.id,
  name: entry.name,
  source: entry.source,
  type: entry.type,
  portrait: portraits[entry.id],
  axisVector: extraAxisVector(entry),
  traits: entry.traits,
  matchCopy: entry.matchCopy,
  palette: extraPalettes[index % extraPalettes.length],
}))

export const characters: Character[] = [...starterCharacters, ...extraCharacters]

import type { Axis, Character, WaifuType } from '@/types'
import { acgtiCharacters } from '@/data/acgtiCharacters'

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

export const characters: Character[] = [...starterCharacters, ...acgtiCharacters]

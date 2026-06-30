import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { API_URL, toAbsoluteAssetUrl } from './src/config';
import { Church, getMobileHomeData, Locale, MobileHomeData, NewsArticle } from './src/api';

const locales: { label: string; value: Locale }[] = [
  { label: 'Հայ', value: 'hy' },
  { label: 'EN', value: 'en' },
  { label: 'RU', value: 'ru' },
];

const copy = {
  hy: {
    appName: 'Սյունյաց թեմ',
    subtitle: 'Հոգեւոր կյանք, ժառանգություն եւ համայնքային լուրեր',
    primate: 'Առաջնորդի խոսք',
    heritage: 'Սրբավայրեր',
    news: 'Լուրեր',
    retry: 'Կրկին փորձել',
    loading: 'Բեռնում...',
    api: 'API',
    empty: 'Տվյալներ չկան',
  },
  en: {
    appName: 'Diocese of Syunik',
    subtitle: 'Spiritual life, heritage, and community updates',
    primate: "Primate's message",
    heritage: 'Sacred heritage',
    news: 'News',
    retry: 'Try again',
    loading: 'Loading...',
    api: 'API',
    empty: 'No content yet',
  },
  ru: {
    appName: 'Сюникская епархия',
    subtitle: 'Духовная жизнь, наследие и новости общины',
    primate: 'Слово предстоятеля',
    heritage: 'Святыни',
    news: 'Новости',
    retry: 'Повторить',
    loading: 'Загрузка...',
    api: 'API',
    empty: 'Пока нет данных',
  },
} satisfies Record<Locale, Record<string, string>>;

export default function App() {
  const [locale, setLocale] = useState<Locale>('hy');
  const [data, setData] = useState<MobileHomeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const labels = copy[locale];

  const load = useCallback(
    async (refresh = false) => {
      setError(null);
      refresh ? setIsRefreshing(true) : setIsLoading(true);

      try {
        setData(await getMobileHomeData(locale));
      } catch (currentError) {
        setError(currentError instanceof Error ? currentError.message : 'Request failed');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const featuredChurches = useMemo(
    () => (data?.churches ?? []).filter((church) => church.isFeatured).slice(0, 4),
    [data?.churches],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={() => void load(true)} />}
      >
        <View style={styles.hero}>
          <View style={styles.languageRow}>
            {locales.map((item) => (
              <Pressable
                key={item.value}
                accessibilityRole="button"
                onPress={() => setLocale(item.value)}
                style={[styles.languageButton, locale === item.value && styles.languageButtonActive]}
              >
                <Text style={[styles.languageText, locale === item.value && styles.languageTextActive]}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.kicker}>{labels.api}: {API_URL}</Text>
          <Text style={styles.title}>{labels.appName}</Text>
          <Text style={styles.subtitle}>{labels.subtitle}</Text>
        </View>

        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator color="#7c3f1d" size="large" />
            <Text style={styles.stateText}>{labels.loading}</Text>
          </View>
        ) : error ? (
          <View style={styles.centerState}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable accessibilityRole="button" onPress={() => void load()} style={styles.retryButton}>
              <Text style={styles.retryText}>{labels.retry}</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {data?.primate ? <PrimateCard title={labels.primate} primate={data.primate} /> : null}
            <Section title={labels.heritage}>
              {featuredChurches.length > 0 ? (
                featuredChurches.map((church) => <ChurchCard key={church.id} church={church} />)
              ) : (
                <Text style={styles.emptyText}>{labels.empty}</Text>
              )}
            </Section>
            <Section title={labels.news}>
              {(data?.news ?? []).slice(0, 3).map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </Section>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function PrimateCard({ title, primate }: { title: string; primate: NonNullable<MobileHomeData['primate']> }) {
  return (
    <View style={styles.primateCard}>
      {toAbsoluteAssetUrl(primate.imageUrl) ? (
        <Image source={{ uri: toAbsoluteAssetUrl(primate.imageUrl) }} style={styles.primateImage} />
      ) : null}
      <View style={styles.primateText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.cardTitle}>{primate.fullName}</Text>
        <Text style={styles.metaText}>{primate.title}</Text>
        {primate.biography ? <Text style={styles.bodyText}>{primate.biography}</Text> : null}
      </View>
    </View>
  );
}

function ChurchCard({ church }: { church: Church }) {
  return (
    <View style={styles.card}>
      {toAbsoluteAssetUrl(church.imageUrl) ? (
        <Image source={{ uri: toAbsoluteAssetUrl(church.imageUrl) }} style={styles.cardImage} />
      ) : null}
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{church.shortName || church.name}</Text>
        <Text style={styles.metaText}>{[church.settlement, church.century].filter(Boolean).join(' · ')}</Text>
        <Text style={styles.bodyText}>{church.summary}</Text>
        {church.serviceSchedule ? <Text style={styles.scheduleText}>{church.serviceSchedule}</Text> : null}
      </View>
    </View>
  );
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <View style={styles.newsCard}>
      <Text style={styles.newsCategory}>{article.category}</Text>
      <Text style={styles.cardTitle}>{article.title}</Text>
      <Text style={styles.bodyText}>{article.excerpt}</Text>
      <Text style={styles.metaText}>{article.publishedAt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f2e8',
  },
  content: {
    paddingBottom: 32,
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 26,
    paddingTop: 14,
    backgroundColor: '#f7f2e8',
  },
  languageRow: {
    alignSelf: 'flex-start',
    borderColor: '#d7c8b2',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 22,
    overflow: 'hidden',
  },
  languageButton: {
    minWidth: 48,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  languageButtonActive: {
    backgroundColor: '#7c3f1d',
  },
  languageText: {
    color: '#614832',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  languageTextActive: {
    color: '#fffaf2',
  },
  kicker: {
    color: '#7b6a57',
    fontSize: 12,
    marginBottom: 12,
  },
  title: {
    color: '#24170e',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
  },
  subtitle: {
    color: '#594434',
    fontSize: 17,
    lineHeight: 25,
    marginTop: 10,
  },
  centerState: {
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 28,
    paddingVertical: 52,
  },
  stateText: {
    color: '#594434',
    fontSize: 16,
  },
  errorText: {
    color: '#8f1f1f',
    fontSize: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#7c3f1d',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  retryText: {
    color: '#fffaf2',
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#2c2118',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  primateCard: {
    backgroundColor: '#fffaf2',
    borderColor: '#e5d8c3',
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  primateImage: {
    aspectRatio: 16 / 10,
    backgroundColor: '#dccbb2',
    width: '100%',
  },
  primateText: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fffaf2',
    borderColor: '#e5d8c3',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardImage: {
    aspectRatio: 16 / 9,
    backgroundColor: '#dccbb2',
    width: '100%',
  },
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    color: '#251910',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
  },
  metaText: {
    color: '#7b6a57',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },
  bodyText: {
    color: '#4b392a',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  scheduleText: {
    color: '#7c3f1d',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 10,
  },
  newsCard: {
    backgroundColor: '#fffaf2',
    borderColor: '#e5d8c3',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 15,
  },
  newsCategory: {
    color: '#7c3f1d',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  emptyText: {
    color: '#7b6a57',
    fontSize: 15,
  },
});

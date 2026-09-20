'use client';

import { useState } from 'react';
import { UserPlus, Copy, Users, Gift, Percent, ChevronDown, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const REFERRAL_PERCENT = 20; // ← поменяешь на реальный процент

export default function ReferralsPage() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralLink = 'https://t.me/feelit_ailab_bot?start=ref_XXXXXX';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — ничего
    }
  };

  return (
    <div className="min-h-dvh px-4 py-8 space-y-6">
      <header className="space-y-1 motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-ease-spring-smooth">
        <h1 className="text-2xl font-bold tracking-tight">Мои рефералы</h1>
        <p className="text-sm text-muted-foreground">Приглашай друзей — получай бонусы</p>
      </header>

      <Card className="border-primary/30 bg-gradient-to-br from-card to-primary/[0.04] motion-opacity-in-[0%] motion-translate-y-in-[20px] motion-duration-[0.6s] motion-ease-spring-smooth">
        <CardContent className="p-5 space-y-4 text-center">
          <div className="p-3 rounded-2xl bg-primary/20 inline-block motion-scale-in-[0.7] motion-duration-[0.6s] motion-ease-spring-bouncy">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-bold tabular-nums">0</div>
            <div className="text-xs text-muted-foreground">приглашённых друзей</div>
          </div>

          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground break-all">
            {referralLink}
          </div>

          <Button onClick={handleCopy} className="w-full">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Скопировано' : 'Скопировать ссылку'}
          </Button>
        </CardContent>
      </Card>

      <Card className="motion-opacity-in-[0%] motion-translate-y-in-[15px] motion-duration-[0.5s] motion-delay-[100ms] motion-ease-spring-smooth">
        <CardContent className="p-0">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <span className="text-sm font-semibold">О реферальной программе</span>
            <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform duration-300', open && 'rotate-180')} />
          </button>
          <div className={cn('overflow-hidden transition-all duration-300 ease-out', open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
            <div className="px-5 pb-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Percent className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Ты получаешь {REFERRAL_PERCENT}%</div>
                  <div className="text-xs text-muted-foreground">
                    от каждой покупки приглашённого — в Stars на твой счёт
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Gift className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Друг получает бонус</div>
                  <div className="text-xs text-muted-foreground">
                    скидку или дополнительные дни при первой оплате
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Как это работает</div>
                  <ol className="text-xs text-muted-foreground space-y-1 mt-1">
                    <li>1. Отправь другу свою ссылку</li>
                    <li>2. Друг запускает бота по ссылке</li>
                    <li>3. Он оформляет подписку</li>
                    <li>4. Ты получаешь {REFERRAL_PERCENT}% Stars</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

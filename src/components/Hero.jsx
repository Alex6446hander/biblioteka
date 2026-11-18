import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-8 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Система управления документами
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
              Надёжное хранение документов, контроль доступа и умная архивация в одном месте.
            </p>
          </div>
          
          <ul className="space-y-4">
            {[
              "Упорядоченный учёт документов",
              "Разграниченная передача прав доступа",
              "Автоматическая архивация и удаление по срокам"
            ].map((text, index) => (
              <li key={index} className="flex items-center text-muted-foreground">
                <div className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                  <ChevronRight className="h-3 w-3 text-primary" />
                </div>
                {text}
              </li>
            ))}
          </ul>

          <div className="pt-4">
            <button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Войти в систему
            </button>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-md aspect-square bg-muted rounded-2xl border border-border flex items-center justify-center shadow-2xl overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
             <span className="text-muted-foreground font-medium relative z-10">Визуализация системы</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

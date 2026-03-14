import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProgressBarComponent } from '../components/progress-bar.component';
import { MetricCardComponent } from '../components/metric-card.component';
import { SliderItem } from '../models/types';
import { modeDefinitions, dashboardDefinitions, questionGroups } from '../models/constants';
import { calculateModel, calculateIdealStateDistance, getSystemFeedback } from '../models/regulation';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ProgressBarComponent, MetricCardComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly dashboardDefinitions = dashboardDefinitions;
  readonly questionGroups = questionGroups;

  selectedDashboardKey = signal('focus');
  arousal = signal(46);
  mood = signal(58);
  centeredness = signal(43);
  clarity = signal(49);
  bodyEnergy = signal(55);
  emotionalPressure = signal(41);
  stimulationNeed = signal(63);
  currentTask = signal('Ich möchte meine Aufmerksamkeit so regulieren, dass ich gut arbeite, ohne mich zu überreizen.');
  microCommitment = signal('Nur den nächsten kleinen Schritt sichtbar machen.');
  focusMessage = signal('');

  selectedDashboard = computed(() =>
    dashboardDefinitions.find(d => d.key === this.selectedDashboardKey()) ?? dashboardDefinitions[0]
  );

  model = computed(() =>
    calculateModel({
      arousal: this.arousal(),
      mood: this.mood(),
      centeredness: this.centeredness(),
      clarity: this.clarity(),
      bodyEnergy: this.bodyEnergy(),
      emotionalPressure: this.emotionalPressure(),
      stimulationNeed: this.stimulationNeed(),
    })
  );

  activeMode = computed(() => modeDefinitions[this.model().modeKey]);

  systemFeedback = computed(() => getSystemFeedback(this.model().modeKey));

  idealStateDistance = computed(() =>
    calculateIdealStateDistance(
      this.arousal(),
      this.mood(),
      this.centeredness(),
      this.clarity(),
      this.bodyEnergy(),
      this.emotionalPressure(),
      this.stimulationNeed()
    )
  );

  sliderItems = computed<SliderItem[]>(() => [
    { key: 'arousal', label: 'Aktivierung / Arousal', value: this.arousal(), left: 'zu niedrig', right: 'zu hoch' },
    { key: 'mood', label: 'Gefühlslage', value: this.mood(), left: 'niedrig', right: 'gut' },
    { key: 'centeredness', label: 'Mitte / innere Balance', value: this.centeredness(), left: 'weg', right: 'zentriert' },
    { key: 'clarity', label: 'Klarheit', value: this.clarity(), left: 'vernebelt', right: 'klar' },
    { key: 'bodyEnergy', label: 'Körperenergie', value: this.bodyEnergy(), left: 'leer', right: 'wach' },
    { key: 'emotionalPressure', label: 'Emotionaler Druck', value: this.emotionalPressure(), left: 'ruhig', right: 'hoch' },
    { key: 'stimulationNeed', label: 'Bedarf an Stimulation', value: this.stimulationNeed(), left: 'wenig', right: 'viel' },
  ]);

  onSliderChange(key: string, value: number): void {
    const signalMap: Record<string, ReturnType<typeof signal<number>>> = {
      arousal: this.arousal,
      mood: this.mood,
      centeredness: this.centeredness,
      clarity: this.clarity,
      bodyEnergy: this.bodyEnergy,
      emotionalPressure: this.emotionalPressure,
      stimulationNeed: this.stimulationNeed,
    };
    signalMap[key]?.set(value);
  }

  resetToBalanced(): void {
    this.arousal.set(55);
    this.mood.set(62);
    this.centeredness.set(60);
    this.clarity.set(61);
    this.bodyEnergy.set(60);
    this.emotionalPressure.set(34);
    this.stimulationNeed.set(50);
    this.microCommitment.set('Den kleinsten nächsten Schritt auswählen und anfangen.');
    this.focusMessage.set('');
  }

  startFocusBlock(): void {
    this.focusMessage.set(
      `Aktiver Modus: ${this.activeMode().label}\n\nAktuelle Aufgabe: ${this.currentTask()}\n\nNächster Schritt: ${this.microCommitment()}`
    );
  }
}

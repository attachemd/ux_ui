import { Component, ChangeDetectionStrategy, signal, computed, ElementRef, ViewChild, input, ChangeDetectorRef, HostListener } from '@angular/core';

@Component({
    selector: 'ft-audio-player',
    standalone: true,
    templateUrl: './audio-player.component.html',
    styleUrl: './audio-player.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class AudioPlayerComponent {
    @ViewChild('audioElement') audioRef!: ElementRef<HTMLAudioElement>;
    @ViewChild('progressBar') progressRef!: ElementRef<HTMLDivElement>;
    
    constructor(private cdr: ChangeDetectorRef) {}

    audioSrc = input('https://www.w3schools.com/html/horse.mp3');
    trackTitle = input('Analyse - Sang');
    isPlaying = signal(false);
    currentTime = signal(0);
    duration = signal(0);
    playbackRate = signal(1);
    isDragging = signal(false);
    volume = signal(1);
    isMuted = signal(false);
    preMuteVolume = signal(1);

    progress = computed(() => {
        const d = this.duration();
        const c = this.currentTime();
        if (!d || isNaN(d) || d === 0 || !isFinite(d)) return 0;
        return Math.max(0, Math.min(100, (c / d) * 100));
    });

    async togglePlay() {
        const audio = this.audioRef.nativeElement;

        if (this.isPlaying()) {
            audio.pause();
        } else {
            try {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    await playPromise;
                }
            } catch (err) {
                console.log("Playback interrupted or interaction required.");
            }
        }
    }

    handleTimeUpdate() {
        if (this.isDragging()) return;

        const audio = this.audioRef?.nativeElement;
        if (audio) {
            this.currentTime.set(audio.currentTime);
            if (audio.duration && audio.duration !== this.duration()) {
                this.duration.set(audio.duration);
            }
            this.cdr.detectChanges();
        }
    }

    handleLoadedMetadata() {
        const audio = this.audioRef?.nativeElement;
        if (audio) {
            this.duration.set(audio.duration);
            this.cdr.detectChanges();
        }
    }

    handlePlaying() {
        this.isPlaying.set(true);
        this.cdr.detectChanges();
    }

    handleEnded() {
        this.isPlaying.set(false);
        this.currentTime.set(0);
        this.cdr.detectChanges();
    }

    handleProgressBarMouseDown(event: PointerEvent) {
        this.isDragging.set(true);
        this.seek(event);
        
        // Capture pointer to continue receiving events even if mouse leaves the element
        const el = event.target as HTMLElement;
        el.setPointerCapture(event.pointerId);
    }

    @HostListener('window:pointermove', ['$event'])
    onWindowPointerMove(event: PointerEvent) {
        if (this.isDragging()) {
            this.seek(event);
        }
    }

    @HostListener('window:pointerup', ['$event'])
    onWindowPointerUp(event: PointerEvent) {
        if (this.isDragging()) {
            this.isDragging.set(false);
            const audio = this.audioRef.nativeElement;
            audio.currentTime = this.currentTime();
            
            // Release pointer capture
            const el = event.target as HTMLElement;
            if (el.releasePointerCapture) {
                el.releasePointerCapture(event.pointerId);
            }
            
            this.cdr.detectChanges();
        }
    }

    seek(event: MouseEvent | PointerEvent) {
        if (!this.duration()) return;
        const rect = this.progressRef.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const time = percentage * this.duration();

        this.currentTime.set(time);
        
        // Only update audio element directly if not dragging to avoid stutter
        if (!this.isDragging()) {
            this.audioRef.nativeElement.currentTime = time;
        }
        
        this.cdr.detectChanges();
    }

    cycleSpeed() {
        const speeds = [1, 1.25, 1.5, 2, 0.5];
        const currentIndex = speeds.indexOf(this.playbackRate());
        const nextIndex = (currentIndex + 1) % speeds.length;
        const newSpeed = speeds[nextIndex];

        this.playbackRate.set(newSpeed);
        this.audioRef.nativeElement.playbackRate = newSpeed;
    }

    toggleMute() {
        const audio = this.audioRef.nativeElement;
        if (this.isMuted()) {
            this.isMuted.set(false);
            this.volume.set(this.preMuteVolume());
            audio.volume = this.preMuteVolume();
            audio.muted = false;
        } else {
            this.preMuteVolume.set(this.volume());
            this.isMuted.set(true);
            this.volume.set(0);
            audio.volume = 0;
            audio.muted = true;
        }
        this.cdr.detectChanges();
    }

    setVolume(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = parseFloat(input.value);
        const audio = this.audioRef.nativeElement;
        
        this.volume.set(value);
        audio.volume = value;
        
        if (value > 0) {
            this.isMuted.set(false);
            audio.muted = false;
        } else {
            this.isMuted.set(true);
            audio.muted = true;
        }
        this.cdr.detectChanges();
    }

    adjustVolume(step: number) {
        const audio = this.audioRef.nativeElement;
        let newVolume = Math.max(0, Math.min(1, this.volume() + step));
        
        this.volume.set(newVolume);
        audio.volume = newVolume;
        
        if (newVolume > 0) {
            this.isMuted.set(false);
            audio.muted = false;
        } else {
            this.isMuted.set(true);
            audio.muted = true;
        }
        this.cdr.detectChanges();
    }

    formatTime(seconds: number): string {
        if (!seconds || isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}
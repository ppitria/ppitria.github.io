package PBO;
import java.util.Scanner;

class Bentuk {
    // Kelas induk
    public int alas, tinggi;
    public int jari;
    public double hasil;
}
class Lingkaran extends Bentuk {
    private double hasil(int jari){
        return Math.PI * jari * jari;
    }
    public int getJari() {
        return jari;
    }
    public void setJari(int jari) {
        this.jari = jari;
    }
    public double getHasil() {
        return hasil(jari);
    }
}
class Segitiga extends Bentuk {
    private double hasil(int alas, int tinggi){
        return alas*tinggi*0.5;
    }
    public int getAlas() {
        return alas;
    }
    public void setAlas(int alas) {
        this.alas = alas;
    }
    public int getTinggi() {
        return tinggi;
    }
    public void setTinggi(int tinggi) {
        this.tinggi = tinggi;
    }
    public double getHasil() {
        return hasil(alas, tinggi);
    }
}
public class UTS {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        char ulanglagi;
        
        System.out.println("PROGRAM MENCARI LUAS BANGUN DATAR");

        do{
            System.out.println("Pilihan Menu");
            System.out.println("1. Luas Lingkaran");
            System.out.println("2. Luas Segitiga");
            System.out.print("Masukkan pilihan menu : ");
            int pilih = input.nextInt();
            
            switch(pilih){
                case 1:
                    System.out.print("Masukkan Nilai Jari-Jari : ");
                    Lingkaran lingkaran = new Lingkaran();
                    lingkaran.setJari(input.nextInt());
                    
                    System.out.println("Luas Lingkaran : " + lingkaran.getHasil());
                    break;
                case 2:
                    System.out.println("Masukkan Nilai Alas (enter) Tinggi ");
                    Segitiga segitiga = new Segitiga();
                    segitiga.setAlas(input.nextInt());
                    segitiga.setTinggi(input.nextInt());
            
                    System.out.println("Luas Segitiga : " + segitiga.getHasil());
                    break;
                    
                default:
                    System.out.println("Angka yang dimasukkan salah!!");
                    System.out.println("Masukkan angka 1-2!");
                    break;
            }
            System.out.println();
            
            System.out.print("Apakah anda akan mencoba lagi (y/t)? ");
            ulanglagi = input.next().charAt(0);
            
            System.out.println();
        }
        while(ulanglagi != 't');
        System.out.println("Terima kasih");
    }
}


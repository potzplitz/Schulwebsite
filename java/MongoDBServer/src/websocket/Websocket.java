package websocket;

import java.io.IOException;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

import database.AccessDatabase;
import gui.Gui;

public class Websocket {
    private ServerSocket serverSocket;
    private volatile boolean isServerRunning = false; // Boolean-Variable zum Überwachen des Server-Status
    
    private Gui gui; // Referenz auf die Gui-Klasse

    public Websocket(Gui gui) {
        this.gui = gui;
    }

    public void startServer() {
        int port = 8080; // Portnummer, auf der der Server lauscht

        try {
            serverSocket = new ServerSocket(port);
            System.out.println("Server wartet auf Verbindungen auf Port " + port);
            isServerRunning = true; // Setzen Sie die Server-Status-Variable auf true
            
            int count = 1;

            while (isServerRunning) { // Solange der Server läuft
                Socket clientSocket = serverSocket.accept(); // Warten auf Verbindung
                System.out.println("Verbindung hergestellt von: " + clientSocket.getInetAddress());
                gui.updateLastConnectsLabel("letzte Verbindung: " + clientSocket.getInetAddress(), "Gesamte Anfragen: " + count);
                count++;


                // Antwortnachricht an den Client
                AccessDatabase data = new AccessDatabase();
                String response = data.databaseAccess();

                // CORS-Header hinzufügen
                String headers = "HTTP/1.1 200 OK\r\n" +
                                 "Content-Type: text/plain\r\n" +
                                 "Access-Control-Allow-Origin: *\r\n"; // Erlaubt den Zugriff von allen Ursprüngen

                OutputStream outputStream = clientSocket.getOutputStream();
                outputStream.write((headers + "\r\n" + response).getBytes(StandardCharsets.UTF_8));

                // Verbindung schließen
                clientSocket.close();
            }

        } catch (IOException e) {
            if (!isServerRunning) {
                System.out.println("Server wurde gestoppt.");
            } else {
                e.printStackTrace();
            }
        }
        
        
    }

    public void stopServer() {
        isServerRunning = false; // Setzt die Boolean-Variable auf false, um den Server-Thread zu beenden

        try {
            if (serverSocket != null && !serverSocket.isClosed()) {
                serverSocket.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

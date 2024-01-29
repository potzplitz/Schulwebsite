package gui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;

import websocket.Websocket;



public class Gui {

    int toggle = 0;
    Websocket socket;
    public JLabel lastconnects = new JLabel("letzte Verbindung: ");
    public JFrame frame = new JFrame("Datenbankenserversteuerung");
    public  JLabel totalconnects = new JLabel("Gesamte Anfragen: 0");
    
    public Gui() {
        socket = new Websocket(this); // Initialisieren Sie den Websocket mit einem Verweis auf diese Gui-Instanz
    }

    public void buildGui() {
        
        frame.setSize(400, 200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(null);
        frame.setResizable(false);

        JLabel activity = new JLabel("Server ist ausgeschaltet.");
        activity.setBounds(110, 2, 200, 30);

       
        lastconnects.setBounds(110, 80, 200, 30);

       
        totalconnects.setBounds(110, 120, 200, 30);

        JButton toggleserver = new JButton("Server einschalten");
        toggleserver.setBounds(106, 40, 150, 30);

        toggleserver.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                if (toggle == 1) {
                    toggleserver.setText("Server einschalten");
                    activity.setText("Server ist ausgeschaltet.");

                    socket.stopServer();

                    toggle = 0;
                } else if (toggle == 0) {
                    toggleserver.setText("Server ausschalten");
                    activity.setText("Server ist eingeschaltet.");

                    // Starten Sie den Server in einem separaten Thread
                    Thread serverThread = new Thread(new Runnable() {
                        @Override
                        public void run() {
                            socket.startServer();
                        }
                    });
                    serverThread.start();

                    toggle = 1;
                }
            }
        });

        frame.add(activity);
        frame.add(toggleserver);
        frame.add(lastconnects);
        frame.add(totalconnects);
        frame.setVisible(true);
    }
    
    public void updateLastConnectsLabel(String newText, String connects) {
        lastconnects.setText(newText);
        totalconnects.setText(connects);
        frame.repaint();
    }


}

#r "System.dll"
#r "System.Data.dll"
#r "System.Windows.dll"
#r "PresentationFramework.dll"
#r "WindowsBase.dll"
#r "System.Xaml.dll"
#r "PresentationCore.dll"
#r "System.Runtime.dll"

using Internal;
using System;
using System.Collections;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Dynamic;
using System.Windows.Media;

public class Startup
{
    private static AutoResetEvent windowClosedEvent = new AutoResetEvent(false);
    private static VerticalAlignment msgVAlignment = VerticalAlignment.Center;
    private static HorizontalAlignment msgHAlignment = HorizontalAlignment.Center;

    public async Task<object> Invoke(dynamic inputData)
    {
        // Start a new thread with STA apartment state
        Thread thread = new Thread(() =>
        {
            // Your existing WPF code
            var mainWindow = new Window
            {
                Title = inputData.title,
                Width = inputData.width,
                Height = inputData.height,
                Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString(inputData.backgroundColor)),
                Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString(inputData.foregroundColor)),
            };

            var stackPanel = new StackPanel();

            foreach (var textBlockData in inputData.textBlocks)
            {
                var textBlock = new TextBlock
                {
                    Text = textBlockData.text,
                    VerticalAlignment = string.IsNullOrWhiteSpace(textBlockData.verticalAlignment)
            ? VerticalAlignment.Center
            : (VerticalAlignment)Enum.Parse(typeof(VerticalAlignment), textBlockData.verticalAlignment, true),
                    HorizontalAlignment = string.IsNullOrWhiteSpace(textBlockData.horizontalAlignment)
            ? HorizontalAlignment.Center
            : (HorizontalAlignment)Enum.Parse(typeof(HorizontalAlignment), textBlockData.horizontalAlignment, true)
                };

                // Add the TextBlock to the StackPanel
                stackPanel.Children.Add(textBlock);
            }

            foreach (var btn in inputData.buttons)
            {
                var textBlock = new Button
                {
                    Content = btn.text,
                    VerticalAlignment = string.IsNullOrWhiteSpace(btn.verticalAlignment)
            ? VerticalAlignment.Center
            : (VerticalAlignment)Enum.Parse(typeof(VerticalAlignment), btn.verticalAlignment, true),
                    HorizontalAlignment = string.IsNullOrWhiteSpace(btn.horizontalAlignment)
            ? HorizontalAlignment.Center
            : (HorizontalAlignment)Enum.Parse(typeof(HorizontalAlignment), btn.horizontalAlignment, true),
                    Background = new SolidColorBrush((Color)ColorConverter.ConvertFromString(btn.backgroundColor)),
                    Foreground = new SolidColorBrush((Color)ColorConverter.ConvertFromString(btn.foregroundColor)),
                };

                textBlock.Click += (object sender, RoutedEventArgs e) =>
                {
                    try
                    {
                        btn.onClick();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                        Console.WriteLine(ex.StackTrace);
                    };
                };

                // Add the TextBlock to the StackPanel
                stackPanel.Children.Add(textBlock);
            }

            mainWindow.Content = stackPanel;

            // Handle the window closed event
            mainWindow.Closed += (sender, args) =>
            {
                windowClosedEvent.Set();
            };

            mainWindow.Show();

            // Start the WPF application message loop on the STA thread
            System.Windows.Threading.Dispatcher.Run();
        });

        // Set the apartment state before starting the thread
        thread.SetApartmentState(ApartmentState.STA);
        thread.Start();

        // Wait for the window to be closed before returning
        windowClosedEvent.WaitOne();

        return null;
    }
}
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using Xunit;
using System;

namespace Connect4Tests
{
    public class Connect4Test : IDisposable
    {
        private readonly ChromeDriver driver;
        private WebDriverWait wait;

        public Connect4Test()
        {
            driver = new ChromeDriver();
            driver.Navigate().GoToUrl("https://luo-hong-jun.github.io/Web_ikt_3/");
            wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        }

        public void Dispose()
        {
            driver.Quit();
        }

        [Fact]
        public void StartButtonGeneratesGrid()
        {
            var startButton = driver.FindElement(By.Id("StartButton"));
            startButton.Click();

            wait.Until(d => d.FindElements(By.CssSelector("#table .block")).Count == 42);
            var cells = driver.FindElements(By.CssSelector("#table .block"));
            Assert.Equal(42, cells.Count);
            foreach (var cell in cells)
            {
                Assert.Equal("rgba(211, 211, 211, 1)", cell.GetCssValue("background-color")); // "lightgray"
            }
        }

        [Fact]
        public void PlayerCanDropPiece()
        {
            StartGame();
            var cell = driver.FindElement(By.Id("5-0"));
            cell.Click();
            Assert.Equal("rgba(173, 216, 230, 1)", cell.GetCssValue("background-color")); // "lightblue"
        }


        [Fact]
        public void CannotDropPieceOutsideGrid()
        {
            StartGame();
            var outOfBounds = driver.FindElements(By.Id("6-0"));
            Assert.Empty(outOfBounds);
        }

        [Fact]
        public void TurnsProperlySwitch()
        {
            StartGame();
            driver.FindElement(By.Id("5-0")).Click();
            Assert.Equal("rgba(173, 216, 230, 1)", driver.FindElement(By.Id("5-0")).GetCssValue("background-color")); // "lightblue"
            driver.FindElement(By.Id("5-1")).Click();
            Assert.Equal("rgba(240, 128, 128, 1)", driver.FindElement(By.Id("5-1")).GetCssValue("background-color")); // "lightcoral"
        }

        [Fact]
        public void GridUpdatesAfterEveryTurn()
        {
            StartGame();
            driver.FindElement(By.Id("5-0")).Click();
            Assert.Equal("rgba(173, 216, 230, 1)", driver.FindElement(By.Id("5-0")).GetCssValue("background-color")); // "lightblue"
            driver.FindElement(By.Id("5-1")).Click();
            Assert.Equal("rgba(240, 128, 128, 1)", driver.FindElement(By.Id("5-1")).GetCssValue("background-color")); // "lightcoral"
        }

        [Fact]
        public void HorizontalWinCondition()
        {
            StartGame();
            int[,] moves = new int[,]
            {
                {5, 0}, {4, 0},
                {5, 1}, {4, 1},
                {5, 2}, {4, 2},
                {5, 3}
            };

            for (int i = 0; i < moves.GetLength(0); i++)
            {
                driver.FindElement(By.Id($"{moves[i, 0]}-{moves[i, 1]}")).Click();
            }

            Assert.Equal("blue won!", driver.FindElement(By.Id("Winner")).Text);
        }

        [Fact]
        public void VerticalWinCondition()
        {
            StartGame();
            for (int i = 5; i > 2; i--)
            {
                driver.FindElement(By.Id($"{i}-0")).Click();
                driver.FindElement(By.Id($"{i}-1")).Click();
            }
            driver.FindElement(By.Id("2-0")).Click();
            Assert.Equal("blue won!", driver.FindElement(By.Id("Winner")).Text);
        }

        [Fact]
        public void DiagonalWinCondition()
        {
            StartGame();
            driver.FindElement(By.Id("5-0")).Click();
            driver.FindElement(By.Id("5-1")).Click();
            driver.FindElement(By.Id("4-1")).Click();
            driver.FindElement(By.Id("5-2")).Click();
            driver.FindElement(By.Id("4-2")).Click();
            driver.FindElement(By.Id("5-3")).Click();
            driver.FindElement(By.Id("3-2")).Click();
            driver.FindElement(By.Id("4-3")).Click();
            driver.FindElement(By.Id("3-3")).Click();
            driver.FindElement(By.Id("4-0")).Click();
            driver.FindElement(By.Id("2-3")).Click();
            Assert.Equal("blue won!", driver.FindElement(By.Id("Winner")).Text);
        }

        [Fact]
        public void DrawCondition()
        {
            StartGame();
            int[][] moves = new int[][]
            {
                new int[] {5, 0}, new int[] {4, 0}, new int[] {3, 0}, new int[] {2, 0}, new int[] {1, 0}, new int[] {0, 0},
                new int[] {5, 1}, new int[] {4, 1}, new int[] {3, 1}, new int[] {2, 1}, new int[] {1, 1}, new int[] {0, 1},
                new int[] {5, 2}, new int[] {4, 2}, new int[] {3, 2}, new int[] {2, 2}, new int[] {1, 2}, new int[] {0, 2},
                new int[] {5, 6}, new int[] {4, 6}, new int[] {3, 6}, new int[] {2, 6}, new int[] {1, 6}, new int[] {0, 6},
                new int[] {5, 5}, new int[] {4, 5}, new int[] {3, 5}, new int[] {2, 5}, new int[] {1, 5}, new int[] {0, 5},
                new int[] {5, 4}, new int[] {4, 4}, new int[] {3, 4}, new int[] {5, 3}, new int[] {4, 3}, new int[] {3, 3},
                new int[] {2, 3}, new int[] {2, 4}, new int[] {1, 4}, new int[] {1, 3}, new int[] {0, 3}, new int[] {0, 4}
            };

            foreach (var move in moves)
            {
                var cell = driver.FindElement(By.Id($"{move[0]}-{move[1]}"));
                cell.Click();
            }

            Assert.Equal("No one won!", driver.FindElement(By.Id("Winner")).Text);
        }

        [Fact]
        public void GameEndsCorrectlyOnWinOrDraw()
        {
            HorizontalWinCondition();
            DrawCondition();
        }

        [Fact]
        private void StartGame()
        {
            var startButton = driver.FindElement(By.Id("StartButton"));
            startButton.Click();
        }

    }
}
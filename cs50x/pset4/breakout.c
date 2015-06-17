//
// breakout.c
//
// Computer Science 50
// Problem Set 4
//

// standard libraries
#define _XOPEN_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Stanford Portable Library
#include "gevents.h"
#include "gobjects.h"
#include "gwindow.h"


// height and width of game's window in pixels
#define HEIGHT 600
#define WIDTH 400

// number of rows of bricks
#define ROWS 5

// number of columns of bricks
#define COLS 10

// radius of ball in pixels
#define RADIUS 10

// lives
#define LIVES 3

// paddle dimensions
#define P_HEIGHT 10
#define P_WIDTH 60
#define P_LOC 520

// prototypes
void initBricks(GWindow window);
GOval initBall(GWindow window);
GRect initPaddle(GWindow window);
GLabel initScoreboard(GWindow window);
void updateScoreboard(GWindow window, GLabel label, int points);
GObject detectCollision(GWindow window, GOval ball);

int main(void)
{
    // seed pseudorandom number generator
    srand48(time(NULL));

    // instantiate window
    GWindow window = newGWindow(WIDTH, HEIGHT);

    // instantiate bricks
    initBricks(window);

    // instantiate ball, centered in middle of window
    GOval ball = initBall(window);

    // instantiate paddle, centered at bottom of window
    GRect paddle = initPaddle(window);

    // instantiate scoreboard, centered in middle of window, just above ball
    GLabel label = initScoreboard(window);

    // number of bricks initially
    int bricks = COLS * ROWS;

    // number of lives initially
    int lives = LIVES;


    // number of points initially
    int points = 0;
    
    double x_velocity = drand48() + 2.0;
    double y_velocity = 3.0;
    
    //wait for mouse click to start the game.
    GEvent event;  
    do
    {
        event = getNextEvent(MOUSE_EVENT);
    }
    while((event == NULL) || (getEventType(event) != MOUSE_CLICKED));
    
    // keep playing until game over
    while (lives > 0 && bricks > 0)
    {

        // check for mouse event
        event = getNextEvent(MOUSE_EVENT);

        // if we heard one
        if (event != NULL)
        {
            // if the event was mouse movement
            if (getEventType(event) == MOUSE_MOVED)
            {
                // ensure circle follows top cursor
                double paddle_x;
                if((getX(event) - P_WIDTH) <= 0)
                {
                    paddle_x = 0;
                }
                else
                {
                    paddle_x = getX(event) - P_WIDTH;
                }
                setLocation(paddle, paddle_x, P_LOC);
            }
        }    
        move(ball,x_velocity,y_velocity);

        // if ball hits left or right of window, bounce back
        if(( getX(ball) + (RADIUS * 2) >= WIDTH) || (getX(ball) <= 0) )  
        {
            x_velocity = -x_velocity;
        }
        else if(getY(ball) + (RADIUS * 2) >= HEIGHT )   //if ball passes the paddle
        {
                lives--;
                removeGWindow(window,ball);
                ball = initBall(window);
                if(lives > 0)
                {
                    do
                    {
                        event = getNextEvent(MOUSE_EVENT);
                    }
                    while((event == NULL) || (getEventType(event) != MOUSE_CLICKED));
                }
        }
        else if(getY(ball) <= 0)         //if ball hits top of window, reverse y_velocity
        {
            y_velocity = -y_velocity;
        }
        
        pause(10);                      //control speed of the ball
        GObject object = detectCollision(window,ball);
        
        // if ball hits a rectangular object
        if((object != NULL) && (strcmp (getType(object), "GRect") == 0))
        {
            //if ball hits paddle, reverse y velocity
            if(object == paddle)
            {
                y_velocity = -y_velocity;
                
                //if ball hits the paddle on the side, adjust y coordinates of ball so that it bounces back.
                if((getY(ball) + (RADIUS * 2)) >= P_LOC)
                {
                    setLocation(ball,getX(ball),500);
                }
                
            }
            else
            //else, then it's a brick.
            {
                removeGWindow(window,object); //remove brick from window
                y_velocity = -y_velocity;     //reverse y velocity
                points++;                       //add a point to the score
                bricks--;
                updateScoreboard(window,label,points); 
            }
        }
         
        

    }

    if(points == 50)
    {
    GLabel final = newGLabel("WIN");
    setFont(final, "SansSerif-56");
    setColor(final,"GREEN");
    add(window, label);
    addToRegion(window, final, "SOUTH");
   
    }
    else
    {
    GLabel final = newGLabel("LOSS");
    setFont(final, "SansSerif-56");
    setColor(final,"RED");
    add(window, label);
    addToRegion(window, final, "SOUTH");
    
    }

    // wait for click before exiting
    waitForClick();

    // game over
    closeGWindow(window);
    
    return 0;
}

/**
 * Initializes window with a grid of bricks.
 */
void initBricks(GWindow window)
{
    int b_width = 35;
    int b_height = 10;
    
    // TODO
    for (int i=0; i < ROWS; i++)
    {
        for(int j=0; j < COLS; j++)
        {
            
            GRect brick = newGRect(((b_width+5) * j) + 2,50 + (i*(b_height + 5)),b_width, b_height);
            
              
            switch (i)
            {
                case 0 : setColor(brick,"PINK"); break;
                case 1 : setColor(brick, "GREEN"); break;
                case 2 : setColor(brick, "GRAY"); break;
                case 3 : setColor(brick, "ORANGE"); break;
                case 4 : setColor(brick, "PINK"); break;
            }
            setFilled(brick,true);
            add(window,brick);
        }
    }
    
    
}

/**
 * Instantiates ball in center of window.  Returns ball.
 */
GOval initBall(GWindow window)
{
    // TODO
    GOval ball = newGOval((WIDTH/2) - RADIUS, (HEIGHT/2) - RADIUS, RADIUS * 2, RADIUS * 2);
    setColor(ball,"GRAY");
    setFilled(ball, true);
    add(window,ball);
    
    return ball;
}

/**
 * Instantiates paddle in bottom-middle of window.
 */
GRect initPaddle(GWindow window)
{
    // TODO
    GRect paddle = newGRect(WIDTH/2 - (P_WIDTH/2),P_LOC,P_WIDTH,P_HEIGHT);
    setColor(paddle,"GRAY");
    setFilled(paddle,true);
    add(window,paddle);
    return paddle;
}

/**
 * Instantiates, configures, and returns label for scoreboard.
 */
GLabel initScoreboard(GWindow window)
{
    // TODO
    GLabel scoreboard = newGLabel("");
    setFont(scoreboard,"SansSerif-36");
    setColor(scoreboard,"BLACK");
    char score[3];
    sprintf(score,"%i",0);
    setLabel(scoreboard,score);
    
    double x = (WIDTH - getWidth(scoreboard))/2;
    double y = (getHeight(window) - getHeight(scoreboard))/2;  
    setLocation(scoreboard,x,y);
    add(window,scoreboard);

    return scoreboard;
}

/**
 * Updates scoreboard's label, keeping it centered in window.
 */
void updateScoreboard(GWindow window, GLabel label, int points)
{
    // update label
    char s[12];
    sprintf(s, "%i", points);
    setLabel(label, s);

    // center label in window
    double x = (getWidth(window) - getWidth(label)) / 2;
    double y = (getHeight(window) - getHeight(label)) / 2;
    setLocation(label, x, y);
}

/**
 * Detects whether ball has collided with some object in window
 * by checking the four corners of its bounding box (which are
 * outside the ball's GOval, and so the ball can't collide with
 * itself).  Returns object if so, else NULL.
 */
GObject detectCollision(GWindow window, GOval ball)
{
    // ball's location
    double x = getX(ball);
    double y = getY(ball);

    // for checking for collisions
    GObject object;

    // check for collision at ball's top-left corner
    object = getGObjectAt(window, x, y);
    if (object != NULL)
    {
        return object;
    }

    // check for collision at ball's top-right corner
    object = getGObjectAt(window, x + 2 * RADIUS, y);
    if (object != NULL)
    {
        return object;
    }

    // check for collision at ball's bottom-left corner
    object = getGObjectAt(window, x, y + 2 * RADIUS);
    if (object != NULL)
    {
        return object;
    }

    // check for collision at ball's bottom-right corner
    object = getGObjectAt(window, x + 2 * RADIUS, y + 2 * RADIUS);
    if (object != NULL)
    {
        return object;
    }

    // no collision
    return NULL;
}

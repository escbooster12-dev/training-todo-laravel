<?php

namespace Database\Factories;

use App\Models\Todo;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Todo::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'task' => $this->faker->paragraph(1),
            'time' => $this->faker->numberBetween(10, 23) . ':' . $this->faker->numberBetween(10, 59) . ':' . $this->faker->numberBetween(10, 59),
            'date' => $this->faker->date('Y-m-d', '-5 days') 
        ];
    }
}
